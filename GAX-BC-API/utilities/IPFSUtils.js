const pinataSDK = require("@pinata/sdk");
const config = require("../config");
const pinata = pinataSDK(config.PINATA.pinataApiKey, config.PINATA.pinataSecretKey);

const saveFileToIPFS = async (data) => {
  try {
    const options = {
      pinataMetadata: {
        name: data.name
      },
      pinataOptions: {
        cidVersion: 0
      }
    };

    const pinataData = await pinata.pinFromFS(data.path, options);
    return pinataData;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const saveJSONToIPFS = async (json) => {
  console.log("inside saveJSONToIPFS: "+ JSON.stringify(json));
  try {
    const options = {
      pinataMetadata: {
        name: json.name
      },
      pinataOptions: {
        cidVersion: 0
      }
    };
    console.log("inside saveJSONToIPFS options: "+ JSON.stringify(options));
    const pinataData = await pinata.pinJSONToIPFS(json, options);   
    return pinataData;
  } catch (e) {
    console.error(e);
    return false;
  }
};

const testIPFSAuth = () => {
  pinata
    .testAuthentication()
    .then((result) => {
      console.log("IPFS Auth");
      console.log(result);
    })
    .catch((err) => {
      console.log("IPFS Error");
      console.log(err);
    });
};

module.exports = {
  testIPFSAuth,
  saveFileToIPFS,
  saveJSONToIPFS
};
