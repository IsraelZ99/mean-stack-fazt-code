const { Router } = require("express");
const router = Router();

const employeesController = require("../controllers/employees.controller.js");

router.get("/", employeesController.getEmployees);

router.get("/criteria", employeesController.getEmployeesByCriteria);

router.post("/", employeesController.createEmployee);

router.get("/:id", employeesController.getEmployee);

router.put("/:id", employeesController.updateEmployee);

router.delete("/:id", employeesController.deleteEmployee);

router.post("/profile", employeesController.uploadImageProfile);

router.get("/profile/list", employeesController.listImageProfiles);

router.get("/profile/image/:name", employeesController.getProfileImage);

router.get("/profile/download/:name", employeesController.downloadImageProfile);

module.exports = router;
