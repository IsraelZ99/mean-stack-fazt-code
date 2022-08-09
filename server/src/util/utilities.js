const path = require("path");
const os = require("os");

const ip = os.networkInterfaces().eno1[0].address;
const __basedir = path.resolve(".") + "/resources/static/assets/uploads/";

const baseUrl = `http://${ip}:${process.env.PORT || 4000}/api/employees/profile/download/`;

const fileNamePrettier = name => {
  return name.replace(/\s/g, "_");
}

module.exports = {
  __basedir,
  baseUrl,
  fileNamePrettier
};
