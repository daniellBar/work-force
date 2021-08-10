import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';

import { EmployeeList } from '../comps/employee/EmployeeList.jsx';
import { EmployeeSideNavBar } from '../comps/employee/EmployeeSideNavBar.jsx';
import { EmployeeNavBar } from '../comps/employee/EmployeeNavBar.jsx';
import { EmployeeSortingRow } from '../comps/employee/EmployeeSortingRow.jsx';
import { EmployeeDropdownsRow } from '../comps/employee/EmployeeDropdownsRow.jsx';
import { EmployeeEdit } from '../comps/employee/EmployeeEdit.jsx';
import { Modal } from '../comps/Modal.jsx';

import { loadEmployees, removeEmployee } from "../store/action/employeeActions.js";
import { setFilter } from "../store/action/filterActions.js";
import { loadUser } from '../store/action/userActions.js'
import { utilsService } from '../services/utilsService.js';

class _EmployeeApp extends Component {

    state = {
        sortBy: {
            by: 'name',
            direction: 'up'
        },
        currPage: 1,
        employeesPerPage: 8,
        isSnackbarOpen: false,
        isModalOpen: false,
        selectedEmployee: null,
    }

    componentDidMount() {
        this.props.loadEmployees(this.props.filterBy)
        this.props.loadUser()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.filterBy.name !== this.props.filterBy.name || prevProps.filterBy.group !== this.props.filterBy.group) {
            this.setState({ currPage: 1 }, () => { this.props.loadEmployees(this.props.filterBy) })
        }
    }

    componentWillUnmount() {
        this.props.setFilter({ name: '', group: '' })
    }

    buildFilterBy = (searchParams, prevFilterBy = {}) => {
        let filterBy = {}
        searchParams.forEach((value, key) => {
            filterBy = { ...filterBy, [key]: value }
        })
        filterBy = { ...prevFilterBy, ...filterBy }
        return filterBy
    }

    setSort = (sortBy) => {
        this.setState({ sortBy })
    }

    getSortedEmployees = () => {
        const { employees } = this.props
        employees.forEach(employee => {
            if (employee.seniority === undefined) {
                employee.seniority = this._convertTimePeriods(employee.createdAt)
            }
        })
        const { by, direction } = this.state.sortBy
        employees.sort(utilsService.compareValues(by, direction))
        return employees
    }

    paginateEmployeesForDisplay = (employees, currPage, employeesPerPage) => {
        const lastEmployeeIdx = currPage * employeesPerPage
        const firstEmployeeIdx = lastEmployeeIdx - employeesPerPage
        const paginatedEmployees = employees.slice(firstEmployeeIdx, lastEmployeeIdx)
        return paginatedEmployees
    }

    onChangePage = (page) => {
        this.setState({ currPage: page })
    }

    onDelete = (employeeId) => {
        const { loggedInUser } = this.props
        loggedInUser && loggedInUser.isAdmin ? this.handleRemoveEmployee(employeeId) : this.openSnackbar()
    }

    handleRemoveEmployee = (employeeId) => {
        this.props.removeEmployee(employeeId)
        this.setState({ totalNumOfEmployees: this.state.totalNumOfEmployees - 1 })
    }

    handleCloseSnackbar = (e, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        this.setState({ isSnackbarOpen: false })
    }

    openSnackbar = () => {
        this.setState({ isSnackbarOpen: true })
    }

    toggleModal = () => {
        this.setState({ isModalOpen: !this.state.isModalOpen })
    }

    setSelectedEmployee = (employee) => {
        if (employee) {
            const selectedEmployee = { ...employee }
            const employees = this.getSortedEmployees()
            const currIndex = employees.findIndex(employee => employee._id === selectedEmployee._id)
            selectedEmployee.nextEmployee = employees[currIndex + 1] || employees[0]
            selectedEmployee.prevEmployee = employees[currIndex - 1] || employees[employees.length - 1]
            this.setState({ selectedEmployee: selectedEmployee })
        }
        else {
            this.setState({ selectedEmployee: employee })
        }

    }

    _convertTimePeriods(createdAt) {
        const employeeCreationDate = new Date(createdAt)
        const now = new Date(Date.now())
        return utilsService.getMonthsDiffBetweenDates(employeeCreationDate, now)
    }

    render() {
        const employees = this.getSortedEmployees()
        const { currPage, employeesPerPage } = this.state
        const employee = this.state.selectedEmployee
        const numberOfPages = Math.ceil(employees.length / employeesPerPage)
        return (
            <section className="employee-app main-container">
                <div>
                    <Snackbar open={this.state.isSnackbarOpen} autoHideDuration={4000} onClose={this.handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={this.handleCloseSnackbar} severity="error">Only Admin can perform this action</Alert>
                    </Snackbar>
                    <EmployeeNavBar buildFilterBy={this.buildFilterBy} openSnackbar={this.openSnackbar} onToggleModal={this.toggleModal} />
                    <div className="employee-secondary-container flex">
                        <EmployeeSideNavBar buildFilterBy={this.buildFilterBy} />
                        <div className="employee-third-container">
                            <Pagination className="pagination-top" count={numberOfPages} size="small" page={currPage} onChange={(e, page) => this.onChangePage(page)} />
                            <EmployeeSortingRow setSort={this.setSort} />
                            <EmployeeDropdownsRow buildFilterBy={this.buildFilterBy} setSort={this.setSort} />
                            <EmployeeList employees={this.paginateEmployeesForDisplay(employees, currPage, employeesPerPage)} onDelete={this.onDelete} toggleModal={this.toggleModal} setSelectedEmployee={this.setSelectedEmployee} />
                            <Pagination className="pagination-bottom" count={numberOfPages} size="small" page={currPage} onChange={(e, page) => this.onChangePage(page)} />
                        </div>
                    </div>
                </div>
                <Modal isOpen={this.state.isModalOpen}>
                    <div className="modal-header">
                        <h1 className="modal-title">{`${this.state.selectedEmployee ? 'Edit' : 'Add'} Employee`}</h1>
                    </div>
                    <EmployeeEdit employee={employee} openSnackbar={this.openSnackbar} toggleModal={this.toggleModal} setSelectedEmployee={this.setSelectedEmployee} />
                </Modal>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        employees: state.employeeReducer.employees,
        filterBy: state.filterReducer.filterBy,
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    loadEmployees,
    setFilter,
    removeEmployee,
    loadUser
}

export const EmployeeApp = connect(mapStateToProps, mapDispatchToProps)(_EmployeeApp)

