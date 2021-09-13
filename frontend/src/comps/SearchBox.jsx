import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { loadEmployees } from "../store/action/employeeActions.js";
import { setFilter } from "../store/action/filterActions.js";

class _SearchBox extends Component {
  state = {
    name: "",
  };

  componentDidMount() {
    const queryParams = new URLSearchParams(this.props.location.search);
    const queryParamName = queryParams.get("name") || "";
    const queryParamGroup = queryParams.get("group") || "";
    const filterBy = { name: queryParamName, group: queryParamGroup };
    this.setState(filterBy, () => {
      this.props.setFilter({ ...this.props.filterBy, ...filterBy });
    });
  }

  onClickSearchButton = () => {
    const searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("name", this.state.name);
    this.props.history.push(`/employee?${searchParams.toString()}`);
    const filterBy = this.props.buildFilterBy(
      searchParams,
      this.props.filterBy
    );
    this.props.setFilter(filterBy);
  };

  handleChange = ({ target }) => {
    const field = target.name;
    const value = target.value;
    this.setState({ [field]: value });
  };

  render() {
    return (
      <div className="search-box">
        <input
          className="search-input"
          autoComplete="off"
          name="name"
          type="text"
          value={this.state.name}
          onChange={this.handleChange}
          placeholder={`enter employee name`}
          onKeyDown={(e) => e.key === "Enter" && this.onClickSearchButton()}
        />
        <div className="btn search-btn" onClick={this.onClickSearchButton}>
          <SearchIcon />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    filterBy: state.filterReducer.filterBy,
  };
};

const mapDispatchToProps = {
  setFilter,
  loadEmployees,
};

export const SearchBox = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_SearchBox));
