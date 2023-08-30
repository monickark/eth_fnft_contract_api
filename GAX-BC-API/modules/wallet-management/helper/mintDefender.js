
const { AutotaskClient } = require('defender-autotask-client');
const { SentinelClient } = require('defender-sentinel-client');
const ABI = require("../../../config/GAX-ABI.json");
const config = require("../../../config");
const logger = require('../../../utilities/logger');

const DEFENDER_API_KEY = config.DEFENDER_API_KEY;
const DEFENDER_API_SECRET = config.DEFENDER_API_SECRET;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
const DEF_MINT_AUTOTASK_NAME = config.DEF_MINT_AUTOTASK_NAME;
const DEF_MINT_SENTINEL_NAME = config.DEF_MINT_SENTINEL_NAME;
const NETWORK = config.NETWORK;

// console.log("DEFENDER_API_KEY: "+ DEFENDER_API_KEY);
// console.log("DEFENDER_API_SECRET: "+ DEFENDER_API_SECRET);
// console.log("DEF_MINT_AUTOTASK_NAME: "+ DEF_MINT_AUTOTASK_NAME);
// console.log("DEF_MINT_SENTINEL_NAME: "+ DEF_MINT_SENTINEL_NAME);
// console.log("CONTRACT_ADDRESS: "+ CONTRACT_ADDRESS);
// console.log("network: "+ NETWORK);

const autoClient = new AutotaskClient({ apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET });
const sentiClient = new SentinelClient({ apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET });

const mintAutotask = async () => {
  console.log("inside create mint autotask");
  try{
    const myAutotask = {
        name: DEF_MINT_AUTOTASK_NAME,
        encodedZippedCode: await autoClient.getEncodedZippedCodeFromFolder('./modules/wallet-management/autotaskCode/mint'),
        trigger: {
        type: 'webhook'
      //  frequencyMinutes: 1500
        },
        paused: false
    };
    console.log("before mint autotask ....");
   let autoRes = await autoClient.create(myAutotask);
   return autoRes;
  } catch (err) {
    console.log(err);
  } 
}

const mintSentinel = async (req, res, next) => {
console.log("------- mintsentinel start ---------------");
  let autotaskObj = await mintAutotask(req,res, next);
  let autotaskId = autotaskObj.autotaskId;
  console.log("autotaskId: " + autotaskId);
  try {
    const notificationChannels = await sentiClient.listNotificationChannels();
    console.log("Notification id : " + notificationChannels[0].notificationId);
    const requestParameters = {
        network: NETWORK,
        type: 'BLOCK',
        // optional
        confirmLevel: 1, // if not set, we pick the blockwatcher for the chosen network with the lowest offset
        name: DEF_MINT_SENTINEL_NAME,
        addresses: [CONTRACT_ADDRESS],
        abi: JSON.stringify(ABI),
        // optional
        paused: false,
        // optional
        eventConditions: [{ eventSignature: 'ArtbitsMinted(uint256,address,string)' }],
        // optional
      //  functionConditions: [],
        // optional
      //  txCondition: 'gasPrice > 0',
        // optional
        autotaskCondition: autotaskId,
        // optional
        //autotaskTrigger: undefined,
        // optional
        alertThreshold: {
          amount: 2,
          windowSeconds: 3600,
        },
        // optional
        alertTimeoutMs: 0,
        notificationChannels: [notificationChannels[0].notificationId],
      };
     // console.log("requestParameters : " + JSON.stringify(requestParameters));
      await sentiClient.create(requestParameters);
    } catch (err) {
        console.log(err);
      }
      console.log("------- mintsentinel completed ---------------");
};

module.exports = {
  mintSentinel
  }