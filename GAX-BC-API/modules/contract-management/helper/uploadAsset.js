const pinataSDK = require('@pinata/sdk');
const config  = require('../../../config');  
const pinata = pinataSDK(config.PINATA.pinataApiKey, config.PINATA.pinataSecretKey);
const logger = require('../../../utilities/logger');
const IPFSUtils = require('../../../utilities/IPFSUtils');
const responseUtil = require("../../../utilities/response");
const { downloadFile } = require("../../../utilities/downloadFile");
const deleteFile = require("../../../utilities/deleteFile");
var fs = require('fs');

const uploadAsset = async (req, res) => {
  try {
 let image = await uploadImage(req,res);
 let dossier = await uploadDossier(req,res);
 logger.info("Artist: "+ req.body.artist);
 let artist = req.body.artist;
 let pintadata = await uploadJSON(req.body.name, req.body.desc,artist,dossier,image);
 logger.info("pinata data :" + JSON.stringify(pintadata.IpfsHash));
 return [image,dossier,pintadata.IpfsHash];
  } catch (e) {
    logger.info(e)
    logger.info("error in upload asset")
  }
}

const uploadImage = async (req, res) => {

  let IPFS_data;
  logger.info("url: "+ req.body.image);
 
  let filepath = null; 
    try {
    if (req.body.image) {
      filepath = await downloadFile(req.body.image);
    //  logger.info("filepath: "+JSON.stringify(filepath.path));   
      IPFS_data = await IPFSUtils.saveFileToIPFS({
        name: req.body.name,
        path: filepath.path
      });
      if (!IPFS_data) {
        return responseUtil.badRequestErrorResponse(
          res,
          "Unable to upload to IPFS"
        );
      }
      IPFS_URL = config.PINATA.URL + IPFS_data.IpfsHash;      
      logger.info("IPFS_URL: "+ IPFS_URL);
  
      try{
        if(filepath?.path) deleteFile(filepath.path);
    } catch (e){
        console.error(e);
    }
    }
  
  } catch(err){
    logger.info(err);
    logger.info("error in image upload")
  }

  return IPFS_URL;
}

const uploadDossier = async (req, res) => {
  
  let dossiersArr;
  let ipfs_arr=[];
  if (req.body.dossiers) {
  logger.info("dossiers url: "+ req.body.dossiers);
  dossiersArr = req.body.dossiers.toString().split(",");
  logger.info("dossiersArr: "+ dossiersArr)
  logger.info("dossiersArr length: "+ dossiersArr.length)
  let IPFS_URL = "";
  let filepath = null; 
    try {    
      for (var i=0; i<dossiersArr.length; i++) {
      //  logger.info("dossier object: "+ dossiersArr[i])
      filepath = await downloadFile(dossiersArr[i]);
      // logger.info("filepath: "+JSON.stringify(filepath.path));   
      const IPFS_data = await IPFSUtils.saveFileToIPFS({
        name: req.body.name,
        path: filepath.path
      });
      if (!IPFS_data) {
        return responseUtil.badRequestErrorResponse(
          res,
          "Unable to upload to IPFS"
        );
      }
      IPFS_URL = config.PINATA.URL + IPFS_data.IpfsHash;      
      // logger.info("IPFS_URL: "+JSON.stringify(IPFS_URL));   
      ipfs_arr[i]=IPFS_URL;
      try{
        if(filepath?.path) deleteFile(filepath.path);
    } catch (e){
        console.error(e);
    }
    }
   
  } catch(err){
    logger.info(err);
  }
  }
  return ipfs_arr;
}

const uploadJSON = async (name, desc,artist, dossier, image) => {
    try {   
      logger.info("artist: "+ artist);
    let IPFS_JSON_data = await IPFSUtils.saveJSONToIPFS({
      name: name,
      description: desc, 
      artist: artist,     
      dossiers: dossier,
      image: image
    });

    if (!IPFS_JSON_data) {
      return responseUtil.badRequestErrorResponse(
        res,
        "Unable to upload JSON to IPFS"
      );
    }
    logger.info("inside upload json: "+  JSON.stringify(IPFS_JSON_data));
    return IPFS_JSON_data;
  } catch(err){
    logger.info(err);
  }
  return false;
}


module.exports = uploadAsset;