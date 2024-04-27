const router = require('express').Router();
const tipsRouter = require('./notes');
router.use('/notes', tipsRouter);

module.exports = router;
