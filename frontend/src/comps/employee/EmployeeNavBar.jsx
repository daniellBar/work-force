import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBox } from '../SearchBox.jsx'

class _EmployeeNavBar extends Component {

    handleClick = () => {
        const { loggedInUser } = this.props
        loggedInUser && loggedInUser.isAdmin ? console.log('need to implement adding') : this.props.openSnackbar()
    }

    render() {
        const { buildFilterBy } = this.props
        return (
            <section className="employee-header">
                <SearchBox buildFilterBy={buildFilterBy} />
                <div className="btn add-employee-btn" onClick={this.handleClick}>Add Employee</div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

export const EmployeeNavBar = connect(mapStateToProps)(_EmployeeNavBar)

