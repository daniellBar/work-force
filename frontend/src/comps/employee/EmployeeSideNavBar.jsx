import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setFilter } from '../../store/action/filterActions.js'

class _EmployeeSideNavBar extends Component {

    state = {
        activeGroupFilter: ''
    }

    onClick = (group) => {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('group', group)
        this.props.history.push(`/employee?${searchParams.toString()}`)
        const filterBy = this.props.buildFilterBy(searchParams, this.props.filterBy)
        this.setState({ activeGroupFilter: group }, () => this.props.setFilter(filterBy))
    }

    render() {
        const { activeGroupFilter } = this.state
        const groups = ['wifi', 'web', 'algorithms', 'automation infra', 'business', 'human-resources']
        return (
            <section className="employee-side-navbar">
                <div className={`btn employees-btn ${activeGroupFilter === '' ? 'active' : ''}`} onClick={() => this.onClick('')}>
                    <img className="employees-icon" src={require("../../assets/icons/employees.svg")} alt="" />
                    <div className="employees">all employees</div>
                </div>
                <div className="filter-container">
                    <div className="title">group</div>
                    <div className="groups-container">
                        {groups.map((groupName, idx) => {
                            return (
                                <div className={`btn group-btn ${activeGroupFilter === groupName ? 'active' : ''}`} onClick={() => this.onClick(groupName)} key={idx}>
                                    <img className="group-icon" src={require(`../../assets/icons/${groupName}.svg`)} alt="" />
                                    <div className="group-name">{groupName}</div>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </section>
        )
    }
}

const mapStateToProps = state => {
    return {
        filterBy: state.filterReducer.filterBy
    }
}

const mapDispatchToProps = {
    setFilter
}

export const EmployeeSideNavBar = connect(mapStateToProps, mapDispatchToProps)(withRouter(_EmployeeSideNavBar))

