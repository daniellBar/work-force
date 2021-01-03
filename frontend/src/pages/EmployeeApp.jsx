import React, { Component } from "react";
import { connect } from "react-redux";
import { Pagination } from '@material-ui/lab';
import Alert from '@material-ui/lab/Alert';
import Snackbar from '@material-ui/core/Snackbar';
import { EmployeeList } from '../comps/employee/EmployeeList.jsx';
import { EmployeeSideNavBar } from '../comps/employee/EmployeeSideNavBar.jsx';
import { EmployeeNavBar } from '../comps/employee/EmployeeNavBar.jsx';
import { EmployeeSortingRow } from '../comps/employee/EmployeeSortingRow.jsx';

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
        isSnackbarOpen: false
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
        loggedInUser && loggedInUser.isAdmin ? this.props.removeEmployee(employeeId) : this.openSnackbar()
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

    render() {
        const employees = this.getSortedEmployees()
        const { currPage, employeesPerPage } = this.state
        const numberOfPages = Math.ceil(employees.length / employeesPerPage)
        return (
            <section className="employee-app main-container">
                <div>
                    <Snackbar open={this.state.isSnackbarOpen} autoHideDuration={4000} onClose={this.handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                        <Alert onClose={this.handleCloseSnackbar} severity="error">Only Admin can perform this action</Alert>
                    </Snackbar>
                    <EmployeeNavBar buildFilterBy={this.buildFilterBy} openSnackbar={this.openSnackbar} />
                    <div className="employee-secondary-container flex">
                        <EmployeeSideNavBar buildFilterBy={this.buildFilterBy} />
                        <div className="employee-third-container">
                            <Pagination className="pagination-top" count={numberOfPages} size="small" page={currPage} onChange={(e, page) => this.onChangePage(page)} />
                            <EmployeeSortingRow setSort={this.setSort} />
                            <EmployeeList employees={this.paginateEmployeesForDisplay(employees, currPage, employeesPerPage)} onDelete={this.onDelete} />
                            <Pagination className="pagination-bottom" count={numberOfPages} size="small" page={currPage} onChange={(e, page) => this.onChangePage(page)} />
                        </div>
                    </div>
                </div>
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

