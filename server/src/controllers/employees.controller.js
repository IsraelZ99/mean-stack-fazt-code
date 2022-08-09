const path = require("path");

const employeeController = {};

const Employee = require("../models/Employee");
const employeeService = require("../services/employees.services");

employeeController.getEmployees = async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
};

employeeController.getEmployeesByCriteria = (req, res) => {
  employeeService.searchEmployeesByCriteria(req, res);
};

employeeController.createEmployee = async (req, res) => {
  const employee = new Employee(req.body);
  const employeeCreated = await employee.save();
  res.json(employeeCreated);
};

employeeController.getEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findById(id);
  // Employee.findOne({_id: id});
  res.json(employee);
};

employeeController.updateEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  res.json(employee);
};

employeeController.deleteEmployee = async (req, res) => {
  const { id } = req.params;
  const employee = await Employee.findByIdAndDelete(id);
  res.json(employee);
};

employeeController.uploadImageProfile = (req, res) => {
  employeeService.upload(req, res);
};

employeeController.listImageProfiles = (req, res) => {
  employeeService.getListFiles(req, res);
};

employeeController.downloadImageProfile = (req, res) => {
  employeeService.download(req, res);
};

employeeController.getProfileImage = (req, res) => {
  employeeService.filePreview(req, res);
};

module.exports = employeeController;
