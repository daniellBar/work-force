const employeeService = require('./employee.service.js')
const logger = require('../../services/logger.service')

async function getEmployee(req, res) {
    const employee = await employeeService.getById(req.params.id)
    res.send(employee)
}

async function getEmployees(req, res) {
    const employees = await employeeService.query(req.query)
    logger.debug(employees);
    res.send(employees)
}

async function deleteEmployee(req, res) {
    await employeeService.remove(req.params.id)
    res.end()
}

async function updateEmployee(req, res) {
    const employee = req.body;
    await employeeService.update(employee)
    res.send(employee)
}

async function addEmployee(req, res) {
    const employee = req.body;
    await employeeService.add(employee)
    res.send(employee)
}

module.exports = {
    getEmployee,
    getEmployees,
    deleteEmployee,
    updateEmployee,
    addEmployee
}