const router = require('express').Router();
const user_controller = require('../../controllers/user.controller');

router.get('/logout', user_controller.logout);

module.exports = router;
