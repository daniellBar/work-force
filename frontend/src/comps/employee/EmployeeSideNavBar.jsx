import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { setFilter } from '../../store/action/filterActions.js'

class _EmployeeSideNavBar extends Component {

    state = {
        activeFilter: ''
    }

    onClick = (group) => {
        const searchParams = new URLSearchParams(this.props.location.search)
        searchParams.set('group', group)
        this.props.history.push(`/employee?${searchParams.toString()}`)
        const filterBy = this.props.buildFilterBy(searchParams, this.props.filterBy)
        this.setState({activeFilter:group},()=>this.props.setFilter(filterBy))
    }

    render() {
        const { activeFilter } = this.state
        return (
            <section className="employee-side-navbar">
                <div className={`btn employees-btn ${activeFilter === '' ? 'active' : ''}`} onClick={() => this.onClick('')}>
                    <img className="employees-icon" src={require("../../assets/icons/employees.svg")} alt="" />
                    <div className="employees">all employees</div>
                </div>
                <div className="filter-container">
                    <div className="title">group</div>
                    <div className="groups-container">
                        <div className={`btn group-btn ${activeFilter === 'wifi' ? 'active' : ''}`} onClick={() => this.onClick('wifi')}>
                            <img className="group-icon" src={require("../../assets/icons/wifi.svg")} alt="" />
                            <div className="group-name">wifi</div>
                        </div>
                        <div className={`btn group-btn ${activeFilter === 'web' ? 'active' : ''}`} onClick={() => this.onClick('web')}>
                            <img className="group-icon" src={require("../../assets/icons/web.svg")} alt="" />
                            <div className="group-name">web</div>
                        </div>
                        <div className={`btn group-btn ${activeFilter === 'algorithms' ? 'active' : ''}`} onClick={() => this.onClick('algorithms')}>
                            <img className="group-icon" src={require("../../assets/icons/algorithm.svg")} alt="" />
                            <div className="group-name">algorithms</div>
                        </div>
                        <div className={`btn group-btn ${activeFilter === 'automation infra' ? 'active' : ''}`} onClick={() => this.onClick('automation infra')}>
                            <img className="group-icon" src={require("../../assets/icons/automation.svg")} alt="" />
                            <div>automation infra</div>
                        </div>
                        <div className={`btn group-btn ${activeFilter === 'business' ? 'active' : ''}`} onClick={() => this.onClick('business')}>
                            <img className="group-icon" src={require("../../assets/icons/business.svg")} alt="" />
                            <div>business</div>
                        </div>
                        <div className={`btn group-btn ${activeFilter === 'human-resources' ? 'active' : ''}`} onClick={() => this.onClick('human-resources')}>
                            <img className="group-icon" src={require("../../assets/icons/human-resources.svg")} alt="" />
                            <div className="group-name">human-resources</div>
                        </div>
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

