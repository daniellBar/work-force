import { employeeService } from '../../services/employeeService.js'

export function loadEmployees(filterBy = {}) {
  return async dispatch => {
    try {
      const employees = await employeeService.query(filterBy);
      dispatch({ type: 'SET_EMPLOYEES', employees })
    }
    catch (err) {
      console.log('employeeActions: err in loademployees ', err);
    }
  }
}

export function saveEmployee(employee) {
  return async dispatch => {
    try {
      const actionType = employee._id ? 'EDIT_EMPLOYEE' : 'ADD_EMPLOYEE';
      const _employee = await employeeService.save(employee);
      dispatch({ type: actionType, _employee })
    }
    catch (err) {
      console.log('employeeActions: err in saveEmployee ', err);
    }
  }
}

export function removeEmployee(employeeId) {
  return async dispatch => {
    try {
      await employeeService.remove(employeeId)
      dispatch({ type: 'REMOVE_EMPLOYEE', employeeId })
    }
    catch (err) {
      console.log('employeeActions: err in removeEmployee ', err);
    }
  }
}
