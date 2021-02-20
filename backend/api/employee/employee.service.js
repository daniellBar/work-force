
const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = _buildCriteria(filterBy)
    const collection = await dbService.getCollection('employee')
    try {
        const employees = await collection.find(criteria).toArray();
        return employees
    } catch (err) {
        console.log('ERROR: cannot find employees')
        throw err;
    }
}

async function remove(employeeId) {
    const collection = await dbService.getCollection('employee')
    try {
        await collection.deleteOne({ "_id": ObjectId(employeeId) })
    } catch (err) {
        console.log(`ERROR: cannot remove employee ${employeeId}`)
        throw err;
    }
}

async function update(employee) {
    const collection = await dbService.getCollection('employee')
    employee._id = ObjectId(employee._id);
    employee.updatedAt = new Date(Date.now()).toLocaleDateString()
    try {
        await collection.replaceOne({ "_id": employee._id }, employee)
        return employee
    } catch (err) {
        console.log(`ERROR: cannot update employee ${employee._id}`)
        throw err;
    }
}

async function add(employee) {
    const collection = await dbService.getCollection('employee')
    try {
        employee.createdAt = new Date(Date.now()).toLocaleDateString()
        await collection.insertOne(employee);
        return employee;
    } catch (err) {
        console.log(`ERROR: cannot insert employee`)
        throw err;
    }
}

function _buildCriteria(filterBy) {
    const criteria = {};
    for (const key in filterBy) {
        console.log(filterBy[key]);
        if (filterBy[key] !== 'null') {
            criteria[key] = { $regex: new RegExp(filterBy[key], 'i') }
        }
    }
    return criteria;
}


