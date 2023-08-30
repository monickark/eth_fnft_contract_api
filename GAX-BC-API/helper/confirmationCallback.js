const axios = require("axios");
const logger = require('../utilities/logger');
const config = require('../config')
const PLATFORM_API_URI = config.PLATFORM_API_URI;
const PLATFORM_API_AUTH = config.PLATFORM_API_AUTH;
// console.log("PLATFORM_API_AUTH: "+ PLATFORM_API_AUTH);
const sendTxData = async (txData, endPoint) => {
  try {
    const axiosConfig = {
      method: "post",
      url: `${PLATFORM_API_URI}${endPoint}`,
      headers: {
        'X-API-KEY': PLATFORM_API_AUTH
      },
      data: txData
    };
    logger.info("axios url: "+ axiosConfig.url);
    logger.info("return data: "+ JSON.stringify(txData));
    const res = await axios(axiosConfig);

    if (res.status !== 200 && res.data.message !== 'success') {
      throw Error("api call failed");
    }

  } catch (err) {
    logger.info("Error while calling api, error:", err);
  }

  return true;
};

module.exports = {
  sendTxData
};
