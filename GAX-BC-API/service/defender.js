const { DefenderRelayProvider, DefenderRelaySigner } = require('defender-relay-client/lib/ethers');
const { ethers } = require('ethers');

const config = require("../config");
const ABI = require("../config/GAX-ABI.json");

const RLY_API = config.RELAYER_API;
const RLY_SECRET = config.RELAYER_SECRET;
const CONTRACT_ADDRESS = config.CONTRACT_ADDRESS;
const getContract = () => {
  
  console.log("contract address: "+ CONTRACT_ADDRESS);
  const credentials = { apiKey: RLY_API, apiSecret: RLY_SECRET };
  const provider = new DefenderRelayProvider(credentials);
  const signer = new DefenderRelaySigner(credentials, provider, { speed: 'fast' });
  const contract = new ethers.Contract(CONTRACT_ADDRESS, ABI, signer);
  return contract;
};

module.exports = getContract;