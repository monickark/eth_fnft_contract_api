const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');

const commissionFee = async () => {
try {
  const contract = await getContract();
  let commissionvalue = await contract.getTotCommissionAmt();
  logger.info("commissionvalue : " + commissionvalue);
  return commissionvalue;

} catch(err) {
  console.log("err :" + err);
}
  
};

module.exports = commissionFee;
