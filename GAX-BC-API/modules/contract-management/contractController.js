"use strict";

const responseUtil = require("../../utilities/response");
const uploadAsset = require("./helper/uploadAsset");
const {mintNFT} = require("./helper/mintNFT");
const {transferNFT} = require("./helper/transferNFT");
const {addWhitelistAddr} = require("./helper/addWhitelistAddr");
const {removeWhitelistAddr} = require("./helper/removeWhitelistAddr");
const {addDexAddr} = require("./helper/addDexAddr");
const {removeDexAddr} = require("./helper/removeDexAddr");
const logger = require('../../utilities/logger');

const pushAssetForMinting = async (req, res) => {
  logger.info("minting started");
  try{
  logger.info("mint req object :" + JSON.stringify(req.body));
  let ipfsObj = await uploadAsset(req, res);
  console.log("image :"+ JSON.stringify(ipfsObj[0]));
  console.log("dossier :"+ JSON.stringify(ipfsObj[1]));
  console.log("metahash :"+ JSON.stringify(ipfsObj[2]));
   req.body.json = ipfsObj[2];
   req.body.image = ipfsObj[0];
   req.body.dossiers = ipfsObj[1];
   await mintNFT(req.body);
    return responseUtil.successResponse(res, "Asset Minted", ipfsObj[2]);
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}


const transferToken = async (req, res) => {
  try{
    logger.info("transfer token started...");
    await transferNFT(req.body);
    return responseUtil.successResponse(res, "Transfer asset completed");
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const addDexAddress = async (req, res) => {
  logger.info("add dex address.");
  try{
    // mint token 
    logger.info("dex address : " + req.body.address);
    await addDexAddr(req.body);
    return responseUtil.successResponse(res, "Add Dex Address completed");
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const removeDexAddress = async (req, res) => {
  logger.info("remove dex address.");
  try{
    // mint token 
    logger.info("Dex address : " + req.body.address);
    await removeDexAddr(req.body);
    return responseUtil.successResponse(res, "Remove Dex Address completed");
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const addWhitelistAddress = async (req, res) => {
  logger.info("add whitelist address.");
  try{
    // mint token 
    logger.info("address : " + req.body.address);
                logger.info("before publish "+ JSON.stringify(req.body));
    await addWhitelistAddr(req.body);
     return responseUtil.successResponse(res, "success");
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const removeWhitelistAddress = async (req, res) => {
  logger.info("remove whitelist address.");
  try{
    // mint token 
    logger.info("address : " + req.body.address);
                logger.info("before publish "+ JSON.stringify(req.body));
    await removeWhitelistAddr(req.body);
     return responseUtil.successResponse(res, "success");
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

module.exports = {
  pushAssetForMinting, 
  transferToken,
  addDexAddress, 
  addWhitelistAddress,
  removeDexAddress,
  removeWhitelistAddress
};
