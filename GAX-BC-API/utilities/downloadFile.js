const download = require('download-file');
const uuid = require('uuid');
const path = require('path');


const downloadFile = async (url) => {
    return new Promise((resolve, reject) => {
        try {
            let urlData = url.split('/');
          //  console.log("urlData: "+ urlData);
            urlData = urlData[urlData.length - 1];
            urlData = urlData.split('.');            
          //  console.log("urlData: "+ urlData);
            let extension = urlData[urlData.length - 1];            
          //  console.log("extension: "+ extension);
            let filename = uuid.v4() + '.' + extension;
            console.log("Filename: "+ filename);

            var options = {
                directory: path.resolve(__dirname, '../_temp'),
                filename: filename
            };

            download(url, options, function (err) {
                if (err) {
                    console.error(err);
                   reject(err);
                   return;
                }
                resolve({path : path.resolve(__dirname, '../_temp') + '/' + filename })
            })
        } catch (e) {
            console.error(e);
            return false
        }

    });
};


module.exports = {
    downloadFile
};
