const PLANS = [
  {
    name: 'Starter',
    slug: 'starter',
    price: {
      monthly: {
        amount: 49900,
        priceIds: {
          test: 'price_1N5DD5SJOdxAu3G4YfQaowge',
          production: 'price_1N5DD5SJOdxAu3G4YfQaowge',
          development: 'price_1N5DD5SJOdxAu3G4YfQaowge',
        },
      },
      yearly: {
        amount: 499900,
        priceIds: {
          test: 'price_1N5DD5SJOdxAu3G4JpDd6x6C',
          production: 'price_1N5DD5SJOdxAu3G4JpDd6x6C',
          development: 'price_1N5DD5SJOdxAu3G4JpDd6x6C',
        },
      },
    },
  },
  {
    name: 'Pro',
    slug: 'pro',
    price: {
      monthly: {
        amount: 79900,
        priceIds: {
          test: 'price_1N5DECSJOdxAu3G4fA1WdIXv',
          production: 'price_1N5DECSJOdxAu3G4fA1WdIXv',
          development: 'price_1N5DECSJOdxAu3G4fA1WdIXv',
        },
      },
      yearly: {
        amount: 799900,
        priceIds: {
          test: 'price_1N5DECSJOdxAu3G40xEGVFiB',
          production: 'price_1N5DECSJOdxAu3G40xEGVFiB',
          development: 'price_1N5DECSJOdxAu3G40xEGVFiB',
        },
      },
    },
  },
  {
    name: 'Premium',
    slug: 'premium',
    price: {
      monthly: {
        amount: 99900,
        priceIds: {
          test: 'price_1N5DEcSJOdxAu3G45zeo5uJF',
          production: 'price_1N5DEcSJOdxAu3G45zeo5uJF',
          development: 'price_1N5DEcSJOdxAu3G45zeo5uJF',
        },
      },
      yearly: {
        amount: 999900,
        priceIds: {
          test: 'price_1N5DEcSJOdxAu3G4mymNyZjS',
          production: 'price_1N5DEcSJOdxAu3G4mymNyZjS',
          development: 'price_1N5DEcSJOdxAu3G4mymNyZjS',
        },
      },
    },
  },
];

module.exports = {
  PLANS,
};
