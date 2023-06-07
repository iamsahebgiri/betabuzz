const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
    customerId: {
      type: String,
      required: true,
    },
    subscriptionId: {
      type: String,
      required: true,
    },
    plan: {
      type: String,
      enum: ['free', 'starter', 'pro', 'premium'],
      default: 'free',
    },
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

/**
 * @typedef Subscription
 */
const Subscription = mongoose.model('Subscription', subscriptionSchema);

module.exports = Subscription;
