const { User } = require("../models");

const userData = [
  {
    username: "Xandromus",
    password: "xandromus1234",
  },
  {
    username: "Lernantino",
    password: "lernantino1234",
  },
];

const seedUser = async () =>
  await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

module.exports = seedUser;
