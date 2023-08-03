const mongoose = require('mongoose');
const config = require('../src/config/config');
const logger = require('../src/config/logger');
const { Product, Discussion, User } = require('../src/models');
const { products } = require('./products.seed');
const { discussions } = require('./discussions.seed');

mongoose.connect(config.mongoose.url, config.mongoose.options).then(async () => {
  logger.info('Connected to MongoDB');
  const user = await User.create({
    interests: ['Startup', 'Coding'],
    role: 'user',
    isEmailVerified: true,
    email: 'producthunt@mail.com',
    password: '$2a$08$C9OtcDZhrqWuKvEkMXCIDe4Jicpp52vnazfVOEX7owxErvGPMReQ6',
    name: 'Product Hunt',
    avatar:
      'https://api.dicebear.com/6.x/avataaars/svg?seed=producthunt@mail.com&backgroundColor=b6e3f4,c0aede,d1d4f9,fda4af,f0abfc,67e8f9,a7f3d0',

    username: 'producthunt',
    bio: 'Bot',
    gender: 'male',
    language: 'english',
    plan: 'premium',
  });

  const productsToInsert = products.map((product) => {
    return {
      ...product,
      maker: user.id,
    };
  });

  await Product.insertMany(productsToInsert);
  logger.info('Products Done');

  const discussionsToInsert = discussions.map((discussion) => {
    return {
      ...discussion,
      author: user.id,
    };
  });

  await Discussion.insertMany(discussionsToInsert);
  logger.info('Discussions Done');
});
