const express = require("express");
const {
  requireAuth,
  requireAdmin,
} = require("../../middlewares/requireAuth.middleware");
const {
  getEmployee,
  getEmployees,
  updateEmployee,
  addEmployee,
  deleteEmployee,
} = require("./employee.controller");
const router = express.Router();

router.get("/", getEmployees);
router.get("/:id", getEmployee);
router.put("/:id", requireAuth, updateEmployee);
router.post("/", requireAdmin, requireAuth, addEmployee);
router.delete("/:id", requireAdmin, requireAuth, deleteEmployee);

module.exports = router;
