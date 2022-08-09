const fs = require("fs");
const uploadFile = require("../middleware/upload");
const utilities = require("../util/utilities");
const Employee = require("../models/Employee");

const searchEmployeesByCriteria = async (req, res) => {
  const filters = req.query;
  let criteria = {};
  for (key in filters) {
    criteria[key] = filters[key];
  }
  const employees = await Employee.find(criteria);
  res.json(employees);
  //   const employees = await Employee.find();
  //   const filteredEmployees = employees.filter((employee) => {
  //     let isValid = true;
  //     for (key in filters) {
  //       isValid = isValid && employee[key] === filters[key];
  //     }
  //     return isValid;
  //   });
  //   res.json(filteredEmployees);
};

const upload = async (req, res) => {
  try {
    const imageUploaded = await uploadFile(req, res);
    if (req.file === undefined) {
      return res.status(400).send({ message: "Please upload a file!" });
    }
    res.status(200).send({
      message: "Uploaded the file successfully ",
      fileName: utilities.fileNamePrettier(req.file.originalname),
    });
  } catch (err) {
    if (err.code === "LIMIT_FILE_SIZE") {
      return res.status(500).send({
        message: "File size cannot be larger than 2MB!",
      });
    }
    res.status(500).send({
      message: `Could not upload the file : ${req.file.originalname}. ${err}`,
    });
  }
};

const getListFiles = (req, res) => {
  const directoryPath = utilities.__basedir;
  fs.readdir(directoryPath, (err, files) => {
    if (err) {
      res.status(500).send({
        message: "Unable to scan files!",
      });
    }
    let fileInfos = [];
    files.forEach((file) => {
      fileInfos.push({
        name: file,
        url: utilities.baseUrl + file,
      });
    });
    res.status(200).send(fileInfos);
  });
};

const download = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = utilities.__basedir;
  res.download(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not download the file. " + err,
      });
    }
  });
};

const filePreview = (req, res) => {
  const fileName = req.params.name;
  const directoryPath = utilities.__basedir;
  res.sendFile(directoryPath + fileName, fileName, (err) => {
    if (err) {
      res.status(500).send({
        message: "Could not show the file. " + err,
      });
    }
  });
};

module.exports = {
  searchEmployeesByCriteria,
  upload,
  getListFiles,
  download,
  filePreview
};
