const { ethers } = require('ethers');
const { sendTxData } = require("../../../helper/confirmationCallback");
const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');
const config = require('../../../config');
const decimal = config.DECIMAL_PRECISION_ROYALTY;
const mintNFT = async (data) => {
    console.log("***** inside mint nft *****");       
    console.log("data inside mintNft : "+ JSON.stringify(data));
    try {
        console.log("***** START *****");        
        const contract = await getContract();
        const dexBips = data.dex_rp* 10** decimal;
        const p2pBips = data.p2p_rp* 10** decimal;
        console.log("dexBips: "+ dexBips);
        console.log("p2pBips: "+ p2pBips);
        await contract.mintToken(data.erc20Name, data.erc20Symbol, data.artId, dexBips, p2pBips, 
          data.noOfArtbits, data.artist, data.json);
        console.log("***** COMPLETED *****");
    } catch (err) {
        console.log("***** ERROR *****");
        console.log(err);
        logger.info("txion failed");
        let retReq = {
          artId: data.artId,
          status: "fail"
         }
         console.log("error callback request :"+ JSON.stringify(retReq));
          await sendTxData(retReq,
              "/api/v1/webhook/minting/callback"
          );
        } 
}

module.exports = {
  mintNFT
}


