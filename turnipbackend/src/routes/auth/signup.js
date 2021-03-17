const router = require('express').Router();
const user_controller = require('../../controllers/user.controller');
const validateInput = require('../../middlewares/validateInput');

router.post(
  '/signup',
  validateInput.validateEmail,
  validateInput.validatePassword,
  user_controller.local_signup
);

module.exports = router;
