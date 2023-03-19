const sequelize = require('../config/connection');
const seedUser = require('./userSeedData');
const seedPost = require('./postSeedData');

const seedAll = async () => {
  await sequelize.sync({ force: true });

  await seedUser();

  await seedPost();
// Terminate Node.js process with success
  process.exit(0);
};

seedAll();