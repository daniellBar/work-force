import React, { Component } from "react";
import { connect } from "react-redux";
import { SearchBox } from "../SearchBox.jsx";

class _EmployeeNavBar extends Component {
  onClickAddEmployee = () => {
    this.props.onToggleModal();
  };

  render() {
    const { buildFilterBy } = this.props;
    return (
      <section className="employee-header">
        <SearchBox buildFilterBy={buildFilterBy} />
        <div className="btn add-employee-btn" onClick={this.onClickAddEmployee}>
          Add Employee
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    loggedInUser: state.userReducer.loggedInUser,
  };
};

export const EmployeeNavBar = connect(mapStateToProps)(_EmployeeNavBar);
