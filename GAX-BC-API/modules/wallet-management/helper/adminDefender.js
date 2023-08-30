
const { AdminClient } = require('defender-admin-client');
const { SentinelClient } = require('defender-sentinel-client');
const ABI = require("../../../config/GAX-ABI.json");
const config = require("../../../config");
const logger = require('../../../utilities/logger');

const DEFENDER_API_KEY = config.DEFENDER_API_KEY;
const DEFENDER_API_SECRET = config.DEFENDER_API_SECRET;
const DEF_CONTRACT_NAME = config.DEF_CONTRACT_NAME;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
const NETWORK = config.NETWORK;
// console.log("DEFENDER_API_KEY: "+ DEFENDER_API_KEY);
// console.log("DEFENDER_API_SECRET: "+ DEFENDER_API_SECRET);
console.log("CONTRACT_ADDRESS: "+ CONTRACT_ADDRESS);
console.log("network: "+ config.NETWORK);
const client = new AdminClient({apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET});
const sentiClient = new SentinelClient({ apiKey: DEFENDER_API_KEY, apiSecret: DEFENDER_API_SECRET });

const createContract = async () => {
  console.log("inside create contract creation");
  createNotification();
  try{
    await client.addContract({ 
      network: NETWORK, 
      address: CONTRACT_ADDRESS,
      name: DEF_CONTRACT_NAME,
      abi: JSON.stringify(ABI),
    });
  } catch (err) {
    console.log(err);
  } 
}

const createNotification = async () => {
  // console.log("DEF_NOTIFICATION_TYPE: "+ config.DEF_NOTIFICATION_TYPE);
  // console.log("DEF_NOTIFICATION_EMAIL_NAME: "+ config.DEF_NOTIFICATION_EMAIL_NAME);
  // console.log("DEF_NOTIFICATION_EMAIL_ID: "+ config.DEF_NOTIFICATION_EMAIL_ID);
  const notificationChannels = await sentiClient.listNotificationChannels();
  console.log("notificationChannels[0] :"+ notificationChannels[0])
  if(notificationChannels[0]==undefined) {
    try{
      const notification = await sentiClient.createNotificationChannel("email", {
        name: config.DEF_NOTIFICATION_EMAIL_NAME,
        config: {
          emails: [config.DEF_NOTIFICATION_EMAIL_ID],
        },
        paused: false,
      });
    } catch(err){
      console.log(err)
    }
      
  } else {
    console.log("notification already esists......")
    console.log("Notification id : " + notificationChannels[0].notificationId);
  }
    

 
}
module.exports = {
  createContract
}