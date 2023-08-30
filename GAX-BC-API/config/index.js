"use strict";
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "../.env") });

module.exports = {  
  HTTP_STATUS_CODES: {
    OK: 200,
    CREATED: 201,
    ACCEPTED: 202,
    NO_CONTENT: 204,
    BAD_REQUEST: 400,
    UNAUTHORIZED: 401,
    FORBIDDEN: 403,
    NOT_FOUND: 404,
    UNPROCESSABLE_ENTITY: 422,
    TOO_MANY_REQUESTS: 429,
    INTERNAL_SERVER_ERROR: 500,
    BAD_GATEWAY: 502,
    SERVICE_UNAVAILABLE: 504,
  },
  QUEUE: {
    minting: "minting-Dev -loc1",
    transfer: "transfer-Gax1",
    addDex: "addDex-Gax",
    addWhitelist: "addWhitelist-Gax",
  }, 
  KMS: {
    ACCOUNT_CONFIG : {
        accessKeyId: process.env.AWS_KMS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_KMS_SECRET_KEY,
        region: process.env.AWS_KMS_REGION,
        user: process.env.AWS_KMS_user
    },     
    keyId : process.env.AWS_KMS_KEY_ID
  },
  PINATA: {
    pinataApiKey:process.env.PINATA_API_KEY,
    pinataSecretKey: process.env.PINATA_SECRET_API_KEY,    
    URL: "https://gateway.pinata.cloud/ipfs/",
  }, 
  PLATFORM_API_URI: process.env.PLATFORM_API_URI,
  PLATFORM_API_AUTH: process.env.PLATFORM_API_AUTH,
  CONTRACT_ADDRESS: process.env.CONTRACT_ADDRESS,
  NETWORK: process.env.NETWORK,
  DECIMAL_PRECISION_ROYALTY: process.env.DECIMAL_PRECISION_ROYALTY,
  
  DEFENDER_API_KEY : process.env.DEFENDER_API_KEY,
  DEFENDER_API_SECRET : process.env.DEFENDER_API_SECRET,
  RELAYER_API : process.env.RELAYER_API,
  RELAYER_SECRET : process.env.RELAYER_SECRET,

  DEF_CONTRACT_NAME : process.env.DEF_CONTRACT_NAME,
  DEF_MINT_AUTOTASK_NAME : process.env.DEF_MINT_AUTOTASK_NAME,
  DEF_MINT_SENTINEL_NAME : process.env.DEF_MINT_SENTINEL_NAME,
  DEF_TRANSFER_AUTOTASK_NAME : process.env.DEF_TRANSFER_AUTOTASK_NAME,
  DEF_TRANSFER_SENTINEL_NAME : process.env.DEF_TRANSFER_SENTINEL_NAME
};
