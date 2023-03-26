const { Comment } = require('../models')

const commentData = [
    {
        "content": "I agree!",
        "date_created": "7/9/2020",
        "user_id": 1,
        "post_id": 3
    },
    {
        "content": "This seems correct!",
        "date_created": "8/30/2020",
        "user_id": 2,
        "post_id": 1
    }
];

const seedComment = () => Comment.bulkCreate(commentData);

module.exports = seedComment