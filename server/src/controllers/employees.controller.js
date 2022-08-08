const employeeController = {};

employeeController.getEmployees = (req, res) => {
    res.send('get employees');
};
employeeController.createEmployee = (req, res) => {
    res.send('create employee');
};
employeeController.getEmployee = (req, res) => {};
employeeController.updateEmployee = (req, res) => {};
employeeController.deleteEmployee = (req, res) => {};

module.exports = employeeController;
