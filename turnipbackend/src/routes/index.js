const router = require('express').Router();

router.use(require('./auth'));
router.use(require('./profile'));

module.exports = router;
