import {httpService} from './httpService.js'

export const employeeService = {
    query,
    remove
}

function query(filterBy={}) {
    const queryStr = Object.keys(filterBy).map((key) => {
        return `${key}=${filterBy[key]}`
    }).join('&');
    return httpService.get(`employee/?${queryStr}`);
}

function remove(employeeId) {
return httpService.delete(`employee/${employeeId}`)
}




