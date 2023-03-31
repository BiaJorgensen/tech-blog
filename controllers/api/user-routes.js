const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
      const userData = await User.create(req.body);
  
      req.session.save(() => {
        req.session.user_id = userData.id;
        req.session.loggedIn = true;
        
        res.status(200).json(userData);
        
      });
    } catch (err) {
      res.status(400).json(err.errors[0]);
    }
  });
  




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
            req.session.user_id = userData.id;
            req.session.loggedIn = true;

            res.json({ user: userData, message: 'Logged In'})
        })
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
      }
});


router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
