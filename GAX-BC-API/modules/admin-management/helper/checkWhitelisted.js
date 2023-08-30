const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');

const isWhitelisted = async (address) => {
  try {
    const contract = await getContract();
    let isWhitelisted = await contract.isWhitelisted(address);
    logger.info("isWhitelisted : " + isWhitelisted);
    return isWhitelisted;
  } catch(err) {
    console.log("err :" + err);
  }
};

module.exports = isWhitelisted;
