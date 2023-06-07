const httpStatus = require('http-status');
const config = require('../config/config');
const Subscription = require('../models/subscription.model');
const ApiError = require('../utils/ApiError');
const stripe = require('stripe')(config.stripe.secretKey);

/**
 * Upgrades the user's billing plan
 * @param {User} user
 * @param {ObjectId} priceId
 * @returns {Promise<Object>}
 */
const upgradeBilling = async (user, priceId) => {
  const stripeSession = await stripe.checkout.sessions.create({
    customer_email: user.email,
    billing_address_collection: 'required',
    success_url: 'http://localhost:3000/settings/billing?success=true',
    cancel_url: 'http://localhost:3000/settings/billing?success=false',
    line_items: [{ price: priceId, quantity: 1 }],
    mode: 'subscription',
    client_reference_id: user.id,
  });
  return stripeSession;
};

/**
 * Manage the user's subscription
 * @param {ObjectId} userId
 * @returns {Promise<String>}
 */
const manageBilling = async (userId) => {
  const subscription = await Subscription.findOne({
    user: userId,
  });

  if (!subscription) {
    throw new ApiError(httpStatus.NOT_FOUND, 'No subscription found');
  }

  const { url } = await stripe.billingPortal.sessions.create({
    customer: subscription.customerId,
    return_url: 'http://localhost:3000/settings/billing',
  });
  return url;
};

module.exports = {
  upgradeBilling,
  manageBilling,
};
