const { SentinelClient } = require('defender-sentinel-client');
const { AutotaskClient } = require('defender-autotask-client');
const ABI = require("../../../config/GAX-ABI.json");
const config = require("../../../config");
const logger = require('../../../utilities/logger');

const DEFENDER_API_KEY = config.DEFENDER_API_KEY;
const DEFENDER_API_SECRET = config.DEFENDER_API_SECRET;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
const DEF_TRANSFER_AUTOTASK_NAME = config.DEF_TRANSFER_AUTOTASK_NAME;
const DEF_TRANSFER_SENTINEL_NAME = config.DEF_TRANSFER_SENTINEL_NAME;
const NETWORK = config.NETWORK;

// console.log("DEFENDER_API_KEY: "+ DEFENDER_API_KEY);
// console.log("DEFENDER_API_SECRET: "+ DEFENDER_API_SECRET);
// console.log("DEF_TRANSFER_AUTOTASK_NAME: "+ DEF_TRANSFER_AUTOTASK_NAME);
// console.log("DEF_TRANSFER_SENTINEL_NAME: "+ DEF_TRANSFER_SENTINEL_NAME);
// console.log("CONTRACT_ADDRESS: "+ CONTRACT_ADDRESS);
// console.log("network: "+ NETWORK);

const autoClient = new AutotaskClient({ apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET });
const sentiClient = new SentinelClient({ apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET });

const transferAutotask = async () => {
  console.log("inside create transfer autotask");
  try{
    const myAutotask = {
        name: DEF_TRANSFER_AUTOTASK_NAME,
        encodedZippedCode: await autoClient.getEncodedZippedCodeFromFolder('./modules/wallet-management/autotaskCode/transfer'),
        trigger: {
        type: 'webhook'
      //  frequencyMinutes: 1500
        },
        paused: false
    };
    console.log("before transfer autotask ....");
   let autoRes = await autoClient.create(myAutotask);
   return autoRes;
  } catch (err) {
    console.log(err);
  } 
}


const transferSentinel = async (req, res, next) => {
  console.log("------- transfersentinel start ---------------");
  let autotaskObj = await transferAutotask(req,res, next);  
  let autotaskId = autotaskObj.autotaskId;
  console.log("autotaskId: " + autotaskId);
  try {
    const notificationChannels = await sentiClient.listNotificationChannels();
    console.log("Notification id : " + notificationChannels);
    if( typeof notificationChannels[0] == 'undefined') {
      console.log("no notification existing....");
      const notification = await sentiClient.createNotificationChannel('email', {
        name: 'EmailNotification',
        config: {
          emails: ['monicka.rk@gmail.com'],
        },
        paused: false,
      });
      console.log("notification created: "+ notification);
    } else {
      console.log("Notification id : " + notificationChannels[0].notificationId);
    }
    const requestParameters = {
        network: NETWORK,
        type: 'BLOCK',
        // optional
        confirmLevel: 1, // if not set, we pick the blockwatcher for the chosen network with the lowest offset
        name: DEF_TRANSFER_SENTINEL_NAME,
        addresses: [CONTRACT_ADDRESS],
        abi: JSON.stringify(ABI),
        // optional
        paused: false,
        // optional
        eventConditions: [{ eventSignature: "ArtbitTransferred(address,address,uint256,uint256)" }],
        // optional
      //  functionConditions: [{ functionSignature: 'transferToken(address,uint,uint)'}],
        // optional
        // txCondition: 'gasPrice > 0',
        // optional
        autotaskCondition: autotaskId.toString(),
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
      console.log("------- transfersentinel completed ---------------");
};
module.exports = {
  transferSentinel
  }