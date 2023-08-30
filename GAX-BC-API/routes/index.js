'use strict';

const express = require('express');
// const { verifyAPIKey } = require('../middleware/verifyAPIKey');

const router = express.Router();

const asset = require('./asset');
const admin = require('./admin');
const wallet = require('./wallet');



router.use('/asset',  asset);
router.use('/admin',  admin);
router.use('/wallet',  wallet);

module.exports = router;
