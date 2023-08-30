const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');

const isDexAddress = async (address) => {
  try {
    const contract = await getContract();
    let isDexAddress = await contract.isDexAddress(address);
    logger.info("isDexAddress : " + isDexAddress);
    return isDexAddress;
  } catch(err) {
    console.log("err :" + err);
  }
};

module.exports = isDexAddress;
