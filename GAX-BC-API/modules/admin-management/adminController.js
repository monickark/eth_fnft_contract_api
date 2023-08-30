"use strict";

const responseUtil = require("../../utilities/response");
const commissionFee = require("./helper/getCommission");
const isWhitelisted = require("./helper/checkWhitelisted");
const isDexAddress = require("./helper/checkDexAddr");
const royaltyAmt = require("./helper/getRoyalty");
const logger = require('../../utilities/logger');
const getCommissionAmt = async (req, res) => {
  logger.info("Get Commission Amount");
  try{
   var fee = await commissionFee();
   logger.info("commission fee : " + fee);
   return responseUtil.successResponse(res, "success", fee);
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const getRoyaltyAmt = async (req, res) => {
  logger.info("Get Royalty Amount");
  try{
   var fee = await royaltyAmt();
   logger.info("royalty fee in controller : " + fee);
   return responseUtil.successResponse(res, "success", fee);
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const isWhitelistedAddr = async (req, res) => {
  logger.info("inside is whitelisted");
  try{
    logger.info("address : "+ req.query.address);   
   var result = await isWhitelisted(req.query.address);
   logger.info("Is whitelisted : " + result);
   return responseUtil.successResponse(res, "success", result);
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

const checkDexAddr = async (req, res) => {
  logger.info("inside is dex addr");
  try{
    logger.info("address : "+ req.query.address);   
   var result = await isDexAddress(req.query.address);
   logger.info("isDexAddress : " + result);
   return responseUtil.successResponse(res, "success", result);
  }
  catch (err) {
  logger.info(err)
  res.status(500).json({
    message:err
  })   
}
}

module.exports = {
  getCommissionAmt, getRoyaltyAmt,isWhitelistedAddr,checkDexAddr
};
