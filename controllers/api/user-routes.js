const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Check if email exists in db
        userData = await User.findOne({
            where: {
                email: req.body.email
            }
        });

        // If email does not exist, send error message
        if(!userData) {
            res.status(400).json({ message: 'Incorrect Email or Password'});
            return;
        }
        // Using verifyPassword function in User.js model to see if password is correct
        const correctPassword = await userData.verifyPassword(req.body.password);
        // If password is incorrect, sends error message
        if(!correctPassword) {
            res.status(400).json({ message: 'Incorrect Email or Password'});
            return; 
        }
        // If email existis in db and password is correct, registers req.session.loggedIn as TRUE and sends success message
        req.session.save(() => {
            req.session.loggedIn = true;

            res.status(200).json({ message: 'Logged In'})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
})
