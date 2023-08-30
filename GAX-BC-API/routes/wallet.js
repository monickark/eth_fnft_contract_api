"use strict";

const express = require("express");
const { verifyAPIKey } = require("../middleware/verifyAPIKey");
const router = express.Router();
const {
    setupDefender
} = require("../modules/wallet-management/walletController");
router.post("/setupDefender", verifyAPIKey, setupDefender);

module.exports = router;
