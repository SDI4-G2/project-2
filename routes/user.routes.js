const UserController = require('../controllers/user.controller');

const userController = new UserController();

const router = require('express').Router();

router.get('/testing', function (req, res) {
  res.send('testing');
});

router.post('/register', userController.register);
router.post('/login', userController.userControl);
router.put('/editusername', userController.editUsername);
router.put('/editpassword', userController.editPassword);
router.put('/update-subscription', userController.updateSubscription);
router.post('/status-subscription', userController.statusSubscription);

module.exports = router;
