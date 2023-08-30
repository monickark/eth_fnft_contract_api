const { ethers } = require('ethers');
const { sendTxData } = require("../../../helper/confirmationCallback");
const getContract = require("../../../service/defender");
const logger = require('../../../utilities/logger');

const transferNFT = async (data) => {
    console.log("***** inside transfer nft *****");       
    console.log("data inside transferNft : "+ JSON.stringify(data));
    try {
        console.log("***** START *****");  
        const contract = await getContract();              
        // const weiArtbits = ethers.utils.parseEther(data.noOfArtbits.toString());
        // console.log("wei artbits: "+ weiArtbits.toString());
        await contract.transferToken(data.toAddr, data.tokenId, data.noOfArtbits);
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
              "/api/v1/webhook/transfer/callback"
          );
    } 
}



module.exports = {
  transferNFT
}


