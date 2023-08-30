const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('ethers');
const config = require("../../../config");
const ABI = require("../../../config/GAX-ABI.json");
const { sendTxData } = require("../../../helper/confirmationCallback");
const logger = require('../../../utilities/logger');
const RLY_API = config.RELAYER_API;
const RLY_SECRET = config.RELAYER_SECRET;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;

const removeWhitelistAddr = async (data) => {
    console.log("***** inside removeWhitelistAddr *****");       
    console.log("data inside removeWhitelistAddr : "+ JSON.stringify(data));
    try {
        console.log("***** START *****");        
        const credentials = { apiKey: RLY_API, apiSecret: RLY_SECRET };
        const provider = new DefenderRelayProvider(credentials);
        const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
        const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
        
        await contract.functions.removeWhiteListAddresses(data.address);
        console.log("***** COMPLETED *****");
    } catch (err) {
        console.log("***** ERROR *****");
        logger.info("txion failed");
        let retReq = {
          artId: data.artId,
          status: "fail"
         }
         console.log("error callback request :"+ JSON.stringify(retReq));
          await sendTxData(retReq,
              "/api/v1/webhook/removeWhitelist/callback"
          );
    } 
}

module.exports = {
  removeWhitelistAddr
}


