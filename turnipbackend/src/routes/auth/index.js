const router = require('express').Router();

router.use(require('./signup'));
router.use(require('./login'));
router.use(require('./logout'));

module.exports = router;
