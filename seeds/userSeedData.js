const { User } = require('../models')

const userData = [
    {
        "username": "Xandromus",
        "password": "xandromus1234"
    },
    {
        "username": "Lernantino",
        "password": "lernantino1234"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser