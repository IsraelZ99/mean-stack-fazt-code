const util = require("util");
const multer = require("multer");
const utilities = require("../util/utilities");
const maxSize = 2 * 1024 * 1024;

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, utilities.__basedir);
  },
  filename: (req, file, cb) => {
    const name = utilities.fileNamePrettier(file.originalname);
    cb(null, name);
  },
});

let uploadImage = multer({
  storage: storage,
  limits: { fileSize: maxSize },
}).single("file");
let uploadFileMiddleware = util.promisify(uploadImage);
module.exports = uploadFileMiddleware;
