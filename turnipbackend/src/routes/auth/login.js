const router = require('express').Router();
const user_controller = require('../../controllers/user.controller');

router.post('/login', user_controller.local_login);

module.exports = router;
