import { httpService } from './httpService.js'

export const employeeService = {
    query,
    remove,
    save
}

function query(filterBy = {}) {
    const queryStr = Object.keys(filterBy).map((key) => {
        return `${key}=${filterBy[key]}`
    }).join('&');
    return httpService.get(`employee/?${queryStr}`);
}

function remove(employeeId) {
    return httpService.delete(`employee/${employeeId}`)
}

function save(employee) {
    if (employee._id) {
        return httpService.put(`employee/${employee._id}`, employee)
    } else {
        return httpService.post(`employee`, employee)
    }
}




