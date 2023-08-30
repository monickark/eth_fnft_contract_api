"use strict";

const express = require("express");
const { verifyAPIKey } = require("../middleware/verifyAPIKey");
const router = express.Router();
const {
    getCommissionAmt, getRoyaltyAmt, isWhitelistedAddr, checkDexAddr
} = require("../modules/admin-management/adminController");
router.get("/getCommission", verifyAPIKey, getCommissionAmt);
router.get("/getRoyalty", verifyAPIKey, getRoyaltyAmt);
router.get("/isWhitelisted", verifyAPIKey, isWhitelistedAddr);
router.get("/isDexAddr", verifyAPIKey, checkDexAddr);

module.exports = router;
