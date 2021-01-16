import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import { withRouter } from "react-router-dom";
import { connect } from 'react-redux';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

import { logout } from '../store/action/userActions.js'

export class _Header extends Component {
    render() {
        const searchParams = this.props.location.search
        const user = this.props.loggedInUser
        return (
            <header className="main-header main-container">
                <nav className="nav-container">
                    <div className="left-nav">
                        <div className="logo">
                            <img className="logo-icon" src={require("../assets/icons/logo.jpg")} alt="" />
                        </div>
                    </div>
                    <div className="right-nav">
                        <div className="right-nav-item">
                            <NavLink onClick={this.props.logout} className="nav-btn" exact to="/">{user ? 'Logout' : 'Login'}</NavLink>
                        </div>
                        <div className="right-nav-item">
                            <NavLink className="nav-btn" exact to={`/employee${searchParams}`}>Employees</NavLink>
                        </div>
                        {user && user.isAdmin && <div className="admin-icon">
                            <SupervisorAccountIcon />
                        </div>
                        }
                    </div>
                </nav>
            </header>
        )
    }
}

const mapStateToProps = state => {
    return {
        loggedInUser: state.userReducer.loggedInUser
    }
}

const mapDispatchToProps = {
    logout
}

export const Header = connect(mapStateToProps, mapDispatchToProps)(withRouter(_Header))