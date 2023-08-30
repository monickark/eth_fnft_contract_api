const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');

const royaltyAmt = async () => {
  try {
    const contract = await getContract();
    let royaltyAmt = await contract.getTotRoyaltyAmt();
    logger.info("royaltyAmt : " + royaltyAmt);
    return royaltyAmt;
  } catch(err) {
    console.log("err :" + err);
  }
};

module.exports = royaltyAmt;
