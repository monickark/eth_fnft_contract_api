const responseUtil = require("../../utilities/response");
const { mintSentinel } = require("./helper/mintDefender");
const { transferSentinel } = require("./helper/transferDefender");
const { createContract } = require("./helper/adminDefender");
const logger = require("../../utilities/logger");

const setupDefender = async (req, res) => {
  console.log("****** DEFENDER SETUP STARTED ******");
  try {
    await createContract();
    await mintSentinel();
    await transferSentinel();
    return responseUtil.successResponse(res, "Sentinels & Autotask Created...");
  } catch (err) {
    console.log(err);
  }
  console.log("****** DEFENDER SETUP COMPLETED ******");
};

module.exports = {
  setupDefender,
};
