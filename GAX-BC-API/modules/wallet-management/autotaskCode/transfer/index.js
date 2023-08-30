const axios = require('axios');
exports.handler = async function(payload) {
	console.log("inside autotask");
	const conditionRequest = payload.request.body;
	const events = conditionRequest.events;
	for(const evt of events) {  
	//	console.log("inside evt : "+ JSON.stringify(evt));	
		console.log("nft: "+ evt.matchedAddresses[0]);	
		console.log("args: "+ JSON.stringify(evt.matchReasons[0].args));				
		console.log("from addr: "+ evt.matchReasons[0].args[0]);
		console.log("to address: "+ evt.matchReasons[0].args[1]);
		console.log("asset id: "+ evt.matchReasons[0].args[2]);
		console.log("artbits: "+ evt.matchReasons[0].args[3]);
		
		try{
			let txData = {
				txhash: evt.hash,
				sender: evt.matchReasons[0].args[0],
				receiver: evt.matchReasons[0].args[1],	
				assetId:evt.matchReasons[0].args[2],
				artbits: evt.matchReasons[0].args[3],
				type: "transfer",
				status: "success"
			   } 
			   console.log("txdata: "+ JSON.stringify(txData));
			const axiosConfig = {
				method: "post",
				url: 'https://gax-api-uat.devtomaster.com/api/v1/webhook/transfer/callback',
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

		} catch (err){
			console.log("err: "+ err);
		}
	}

	return "success";
  }