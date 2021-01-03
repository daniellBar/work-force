import React, { Component } from "react";
import { Switch, Route, Redirect } from 'react-router-dom';
import { Header } from './comps/Header.jsx'
import { EmployeeApp } from './pages/EmployeeApp.jsx'
import { Home } from './pages/Home.jsx'
import { connect } from "react-redux";

export class _App extends Component {
  render() {
    const { loggedInUser } = this.props
    return (
      <div className='app'>
        <Header />
        <main>
          <Switch>
            <Route path="/employee">
              <EmployeeApp />
            </Route>
            <Route exact path="/">
              {loggedInUser ? <Redirect to="/employee" /> : <Home />}
            </Route>
          </Switch>
        </main>
      </div >)
  }
}

const mapStateToProps = state => {
  return {
    loggedInUser: state.userReducer.loggedInUser
  }
}

export const App = connect(mapStateToProps)(_App)


