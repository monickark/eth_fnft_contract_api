const del = require("del");

const deleteFile = (filePath) => {
  del([filePath]);
};

module.exports = deleteFile;