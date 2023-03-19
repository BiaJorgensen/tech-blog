const { User } = require('../models/User')

const userData = [
    {
        "username": "Xandromus",
        "email": "xandromus@email.com",
        "password": "xandromus1234"
    },
    {
        "username": "Lernantino",
        "email": "lernantino@email.com",
        "password": "lernantino1234"
    }
];

const seedUser = () => User.bulkCreate(userData);

module.exports = seedUser