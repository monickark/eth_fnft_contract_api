"use strict";

const express = require("express");
const { verifyAPIKey } = require("../middleware/verifyAPIKey");
const router = express.Router();
const {
    pushAssetForMinting,addDexAddress,addWhitelistAddress, transferToken, mintCallback, removeDexAddress, removeWhitelistAddress
} = require("../modules/contract-management/contractController");
    

router.post("/mint", verifyAPIKey, pushAssetForMinting);
router.post("/transfer", verifyAPIKey, transferToken);
router.post("/addDex", verifyAPIKey, addDexAddress);
router.post("/removeDex", verifyAPIKey, removeDexAddress);
router.post("/addWhitelist", verifyAPIKey, addWhitelistAddress);
router.post("/removeWhitelist", verifyAPIKey, removeWhitelistAddress);

module.exports = router;
