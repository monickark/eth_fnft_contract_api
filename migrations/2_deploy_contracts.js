/* Copyright (C) 2022 Global Art Exchange, LLC ("GAX"). All Rights Reserved.
 * You may not use, distribute and modify this code without a license;
  To obtain a license write to legal@gax.llc */
  
  const { deployProxy } = require('@openzeppelin/truffle-upgrades');   
  const GAX_FNFT = artifacts.require('GAX_FNFT');
  const GAX_Artbits = artifacts.require('GAX_Artbits');
  require('dotenv').config()
  const gax_admin = process.env.gax_admin;
  const metadata_url = process.env.metadata_url; 
  
  module.exports = async function (deployer) {
    //await deployProxy(GAX_Artbits, ["ART1", "A1", 1000, gax_admin], { deployer });
    await deployer.deploy(GAX_Artbits);
    const artbits = await GAX_Artbits.deployed();
    console.log("artbits deployed at : "+ artbits.address);
    
    console.log("nft deployment started : ");
    await deployProxy(GAX_FNFT, ["GAX NFT", "GNFT", metadata_url, gax_admin, artbits.address], { deployer });
    const nft = await GAX_FNFT.deployed();
    console.log("nft deployed at : "+ nft.address);
  }; 
/* Copyright (C) 2022 Global Art Exchange, LLC ("GAX"). All Rights Reserved.
 * You may not use, distribute and modify this code without a license;
  To obtain a license write to legal@gax.llc */