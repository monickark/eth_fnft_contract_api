var GAX_FNFT = artifacts.require("./GAX_FNFT.sol");

const addWhitelistAddress = function (address) {
  logger.info("****************************************");
  logger.info("Adding whitelist address.....");
  logger.info("address : "+ address);
  return GAX_FNFT.deployed().then(async function(gax_instance) {
      await gax_instance.addWhiteListAddresses(address);
    });
}

const addDexAddress = function (address) {
  logger.info("****************************************");
  logger.info("Adding DEX address.....");
  logger.info("address : "+ address);
  return GAX_FNFT.deployed().then(async function(gax_instance) {
      await gax_instance.addDexAddresses(address);
    });
}

const mintToken = function (assetOwner, dex_rp, p2p_rp, noOfArtbits) {
  logger.info("****************************************");
  logger.info("Minting new token.....");
  var instance;
  logger.info("assetOwner : "+ assetOwner +" dex_rp : "+ dex_rp +" p2p_rp : " + p2p_rp + " noOfArtbits : " + noOfArtbits);
  return GAX_FNFT.deployed().then(async function(gax_instance) {
    instance = gax_instance;
    await instance.mintToken(assetOwner, dex_rp, p2p_rp, noOfArtbits, []); //mint 1st token
    return instance.tokenId(); // check toen id =1
  }).then(async function(assetId) {    
    logger.info("Minted Asset Id : " + assetId);
    return await instance.assets(assetId-1);
  }).then(async function(asset) {      
    logger.info("asset : " + JSON.stringify(asset));
    assert.equal(asset.asset_owner, assetOwner);
    assert.equal(asset.dex_rp, dex_rp);
    assert.equal(asset.p2p_rp, p2p_rp);
    assert.equal(asset.no_of_artbits, noOfArtbits);
  }); 
};

const p2p_transferToken = function (from, to, assetId, value) {
  let userWalletBefore, userWalletAfter, asset, finalamt;
  logger.info("****************************************");
  logger.info("Inside peer 2 peer transfer token....");
  var instance;
  logger.info("from : "+ from +" to : "+ to +" assetId : " + assetId + " value : " + value);
  return GAX_FNFT.deployed().then(async function(gax_instance) {
    instance = gax_instance;
      userWalletBefore = await gax_instance.user_wallet(to, assetId);
      await gax_instance.transferToken(from, to, assetId, value, []);
      userWalletAfter = gax_instance.user_wallet(to, assetId);
      asset = gax_instance.assets(assetId);
      return [await userWalletAfter, await asset];
    }).then(async function(retValues) {      
      let asset = retValues[1]; let wallet_amt = retValues[0];
     logger.info("asset : " + JSON.stringify(retValues[1]));
      logger.info("wallet amt : " + retValues[0]);
      var transfer_amt = value - ((asset.p2p_rp * value )/100);
      logger.info("commission : " + (asset.p2p_rp * value )/100);
      logger.info("transfer_amt: " + transfer_amt);
      finalamt = parseInt(userWalletBefore) + parseInt(transfer_amt);
      logger.info("finalamt: " + finalamt);
      assert.equal(wallet_amt, finalamt);
    });
  }

  const dex_transferToken = function (from, to, assetId, value) {
    let userWalletBefore, userWalletAfter, asset, transfer_amt, finalamt;
    logger.info("****************************************");
    logger.info("Inside dex transfer token....");
    var instance;
    logger.info("from : "+ from +" to : "+ to +" assetId : " + assetId + " value : " + value);
    return GAX_FNFT.deployed().then(async function(gax_instance) {
      instance = gax_instance;
        userWalletBefore = await gax_instance.user_wallet(to, assetId);
        await gax_instance.transferToken(from, to, assetId, value, []);
        userWalletAfter = gax_instance.user_wallet(to, assetId);
        asset = gax_instance.assets(assetId);
        return [await userWalletAfter, await asset];
      }).then(async function(retValues) {      
        asset = retValues[1];  userWalletAfter = retValues[0];
       logger.info("asset : " + JSON.stringify(retValues[1]));
        transfer_amt = value - ((asset.dex_rp * value )/100);
        logger.info("commission : " + (asset.dex_rp * value )/100);
        logger.info("transfer_amt: " + transfer_amt);
        finalamt = parseInt(userWalletBefore) + parseInt(transfer_amt);
        logger.info("final amt: " + finalamt);
        logger.info("userWalletAfter : " + retValues[0]);
        assert.equal(userWalletAfter, finalamt);
      });
  }

  const wl_transferToken = function (from, to, assetId, value) {
    let userWalletB4, totalWallet;
    logger.info("****************************************");
    logger.info("Inside whitelist transfer token....");
    var instance;
    logger.info("from : "+ from +" to : "+ to +" assetId : " + assetId + " value : " + value);
    return GAX_FNFT.deployed().then(async function(gax_instance) {
      instance = gax_instance;
      userWalletB4 =  await gax_instance.user_wallet(to, assetId);
      await gax_instance.transferToken(from, to, assetId, value, []);
      return await gax_instance.user_wallet(to, assetId);
    }).then(async function(userWalletAfter) {
      logger.info("wallet_amt b4 : " + userWalletAfter);
      totalWallet = parseInt(userWalletB4) + parseInt(value);
      logger.info("wallet_amt after : " + totalWallet);
      assert.equal(userWalletAfter, totalWallet);
    });
  }

  const withdrawToken = function (from, to, assetId, value) {  
    logger.info("****************************************");
    logger.info("Inside withdraw token....");
    var instance;
    logger.info("from : "+ from +" to : "+ to +" assetId : " + assetId + " value : " + value);
    return GAX_FNFT.deployed().then(async function(gax_instance) {
      instance = gax_instance;
      await gax_instance.withdrawArtbits(from, to, assetId, value);
      var wallet_bal =  gax_instance.user_wallet(to, assetId);
      var account_bal =  gax_instance.balanceOf(to, assetId);
      var already_withdrawn =  gax_instance.user_withdrawn(to, assetId);
      return [await account_bal, await already_withdrawn, await wallet_bal];
    }).then(async function(retValue) {
      logger.info("current bal : " + retValue[0]);
      logger.info("existing bal : " + retValue[1]);      
      logger.info("wallet bal : " + retValue[2]);
      assert.equal(parseInt(retValue[0]), parseInt(retValue[1]));
    });
  }

contract("GAX_FNFT", async function(accounts) {
  var owner_1 = accounts[0];
  var receiver_1 = accounts[1];
  var owner_wl_1 = accounts[2];  
  var receiver_wl_1 = accounts[3];
  var owner_dex_1 = accounts[4];  
  var receiver_dex_1 = accounts[5];

  var p2p_rp1 = 20;
  var dex_rp1= 40;
  var p2p_rp2 = 5;
  var dex_rp2= 15;

    it("Mint asset 0, p2p transfer, withdraw amt", async function() {
      // p2p transfer
      await mintToken(owner_1, dex_rp1, p2p_rp1, 10000); 
      await p2p_transferToken(owner_1, receiver_1, 0, 2000, []);
      await withdrawToken(owner_1, receiver_1,0,200);
      await p2p_transferToken(owner_1, receiver_1, 0, 3000, []);
      await withdrawToken(owner_1, receiver_1,0,1000);
    });

    it("Mint asset 1, p2p transfer, withdraw amt", async function() {
      await mintToken(owner_1, dex_rp2, p2p_rp2, 20000); 
      await p2p_transferToken(owner_1, receiver_1, 1, 2500, []);
      await withdrawToken(owner_1, receiver_1,1,2375);
      await p2p_transferToken(owner_1, receiver_1, 1, 6000, []);
      await withdrawToken(owner_1, receiver_1,1,2500);
    });

    it("Mint asset 2, WL transfer, withdraw amt", async function() {
      // whitelist transfer
      await mintToken(owner_wl_1, dex_rp2, p2p_rp2, 50000);
      await addWhitelistAddress(owner_wl_1);
      await wl_transferToken(owner_wl_1, receiver_wl_1,2,10000);
      await withdrawToken(owner_wl_1, receiver_wl_1,2,5000);
      await wl_transferToken(owner_wl_1, receiver_wl_1,2,2000);
      await withdrawToken(owner_wl_1, receiver_wl_1,2,1000);
    });

    it("Mint asset 3, DEX transfer, withdraw amt", async function() {
      // dex transfer
      await mintToken(owner_dex_1, dex_rp2, p2p_rp2, 3000);
      await addDexAddress(owner_dex_1);
      await dex_transferToken(owner_dex_1, receiver_dex_1,3,2500);
      await withdrawToken(owner_dex_1, receiver_dex_1,3,2000);
      await dex_transferToken(owner_dex_1, receiver_dex_1,3,6000);
      await withdrawToken(owner_dex_1, receiver_dex_1,3,2500);
    });

  });

