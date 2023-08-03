const config = require('../config/config');
// eslint-disable-next-line import/order
const stripe = require('stripe')(config.stripe.secretKey);
const logger = require('../config/logger');
const { PLANS } = require('../config/stripe');
const { User } = require('../models');
const Subscription = require('../models/subscription.model');

const handler = async (req, res) => {
  const relevantEvents = new Set([
    'checkout.session.completed',
    'customer.subscription.updated',
    'customer.subscription.deleted',
  ]);

  const sig = req.headers['stripe-signature'];
  const { webhookSecret } = config.stripe;

  logger.debug(JSON.stringify({ sig }, null, 2));

  let event;
  try {
    if (!sig || !webhookSecret) return;
    event = stripe.webhooks.constructEvent(req.body, sig, webhookSecret);
  } catch (err) {
    logger.error(`❌ Error message: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  if (relevantEvents.has(event.type)) {
    try {
      if (event.type === 'checkout.session.completed') {
        const checkoutSession = event.data.object;

        if (
          checkoutSession.client_reference_id === null ||
          checkoutSession.customer === null ||
          checkoutSession.subscription === null
        ) {
          logger.error('Missing items in Stripe webhook callback');
          return;
        }

        const currentPeriodStart = new Date(0);
        currentPeriodStart.setUTCSeconds(checkoutSession.created);

        const currentPeriodEnd = new Date(0);
        currentPeriodEnd.setUTCSeconds(checkoutSession.expires_at);
        await Subscription.updateOne(
          {
            user: checkoutSession.client_reference_id,
          },
          {
            user: checkoutSession.client_reference_id,
            customerId: checkoutSession.customer.toString(),
            subscriptionId: checkoutSession.subscription.toString(),
            currentPeriodStart,
            currentPeriodEnd,
          },
          { upsert: true },
        );
        // await User.findByIdAndUpdate(checkoutSession.client_reference_id, {
        //   plan: 'starter',
        // });
      } else if (event.type === 'customer.subscription.updated') {
        const subscriptionUpdated = event.data.object;
        const newPriceId = subscriptionUpdated.items.data[0].price.id;

        const { env } = config;
        const currentPlan = PLANS.find(
          (plan) => plan.price.monthly.priceIds[env] === newPriceId || plan.price.yearly.priceIds[env] === newPriceId,
        );
        const customerId = subscriptionUpdated.customer.toString();

        // If user upgrades/downgrades their subscription, update subscription
        await Subscription.updateOne(
          {
            customerId,
          },
          {
            plan: currentPlan.slug,
          },
        );
        const subscription = await Subscription.findOne({ customerId });
        await User.findByIdAndUpdate(subscription.user, {
          plan: currentPlan.slug,
        });
      } else if (event.type === 'customer.subscription.deleted') {
        const subscriptionDeleted = event.data.object;
        const customerId = subscriptionDeleted.customer.toString();

        const subscription = await Subscription.findOne({
          customerId,
        });

        if (!subscription) {
          logger.error('Subscription not found in Stripe webhook `customer.subscription.deleted` callback');
          return;
        }

        subscription.plan = 'free';
        subscription.currentPeriodStart = new Date();
        subscription.currentPeriodEnd = new Date();

        await subscription.save();

        await User.updateOne(
          {
            id: subscription.user,
          },
          {
            plan: 'free',
          },
        );
      } else {
        throw new Error('Unhandled relevant event!');
      }
    } catch (error) {
      await logger.error(`Stripe wekbook failed. Error: ${error.message}`);
      return res.status(400).send('Webhook error: "Webhook handler failed. View logs."');
    }
  } else {
    return res.status(400).send(`🤷‍♀️ Unhandled event type: ${event.type}`);
  }

  res.status(200).json({ received: true });
};

module.exports = {
  handler,
};
