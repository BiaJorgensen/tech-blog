const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Check if username exists in db
        userData = await User.findOne({
            where: {
                username: req.body.username
            }
        });

        // If email does not exist, send error message
        if(!userData) {
            res.status(400).json({ message: 'Incorrect Username or Password'});
            return;
        }
        // Using verifyPassword function in User.js model to see if password is correct
        const correctPassword = await userData.verifyPassword(req.body.password);
        // If password is incorrect, sends error message
        if(!correctPassword) {
            res.status(400).json({ message: 'Incorrect Username or Password'});
            return; 
        }
        // If username existis in db and password is correct, registers req.session.loggedIn as TRUE and sends success message
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ message: 'Logged In'})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});

module.exports = router;
