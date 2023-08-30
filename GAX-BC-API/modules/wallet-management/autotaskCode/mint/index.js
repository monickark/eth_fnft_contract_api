const axios = require('axios');
exports.handler = async function(payload) {
	console.log("inside autotask");
	const conditionRequest = payload.request.body;
	const events = conditionRequest.events;
	for(const evt of events) {  
		//console.log("inside evt : "+ JSON.stringify(evt));	
		console.log("nft: "+ evt.matchedAddresses[0]);	
		console.log("args: "+ JSON.stringify(evt.matchReasons[0].args));				
		console.log("tokenid: "+ evt.matchReasons[0].args[0]);
		console.log("erc20 address: "+ evt.matchReasons[0].args[1]);
		console.log("ipfs: "+ evt.matchReasons[0].args[2]);
		
		try{
          	const ipfs_url = 'https://gateway.pinata.cloud/ipfs/'+evt.matchReasons[0].args[2];
			console.log("ipfs_url: "+ ipfs_url);
            const ipfs =  await axios.get(ipfs_url);
			console.log("dossiers: "+ ipfs.data.dossiers);
			console.log("image: "+ ipfs.data.image);
			let txData = {
				txhash: evt.hash,
				artId: evt.matchReasons[0].args[0],
				erc20: evt.matchReasons[0].args[1],	
				nft:evt.matchedAddresses[0],
				ipfs: 'https://gateway.pinata.cloud/ipfs/' +evt.matchReasons[0].args[2],
				image: ipfs.data.image,
				dossiers: ipfs.data.dossiers,
				type: "minting",
				status: "success"
			} 
			   console.log("txData: "+ JSON.stringify(txData));
			await callback_helper(txData);
            console.log("callback completed....");

		} catch (err){
          let txData = {
            	type: "minting",
				status: "error"
			} 
			console.log("err: "+ err);
          await callback_helper(txData);
          console.log("callback completed....");
		}
	}

	return "success";
  }

 async function callback_helper(txData) {
 		const axiosConfig = {
				method: "post",
				url: 'https://gax-api-uat.devtomaster.com/api/v1/webhook/minting/callback',
				headers: {
					"X-API-KEY": "QyfB404oSur4mnx"
				},
				data: txData
			  };
			  console.log("axios url: "+ axiosConfig.url);
			  const res = await axios(axiosConfig);
			 
			  if (res.status == 200 || res.data.message == 'success') {
				console.log("api call success");
			  } else {
				console.log("api call failed");
			  }
 }