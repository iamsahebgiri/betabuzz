const mongoose = require('mongoose');

const subscriptionSchema = mongoose.Schema(
  {
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
      required: true,
      enum: ['free', 'basic', 'pro', 'premium'],
      default: 'free',
    },
    status: {
      type: String,
      required: true,
      enum: ['active', 'canceled', 'pastDue', 'unpaid'],
    },
    currentPeriodStart: {
      type: Date,
      required: true,
    },
    currentPeriodEnd: {
      type: Date,
      required: true,
    },
    cancelAtPeriodEnd: {
      type: Boolean,
      required: true,
    },
    canceledAt: {
      type: Date,
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
