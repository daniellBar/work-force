import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import ArrowDownwardIcon from "@material-ui/icons/ArrowDownward";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import { setFilter } from "../../store/action/filterActions.js";

class _EmployeeDropdownsRow extends Component {
  state = {
    activeSort: "name",
    sortDirection: "up",
    activeGroupFilter: "all",
  };

  handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    field === "activeGroupFilter"
      ? this.handleFilterChange(value)
      : this.handleSortChange(value);
  };

  handleSortChange = (by) => {
    this.setState({ activeSort: by }, () => {
      this.props.setSort({
        by: this.state.activeSort,
        direction: this.state.sortDirection,
      });
    });
  };

  onClickSortButtons = (direction) => {
    this.setState({ sortDirection: direction }, () => {
      this.props.setSort({
        by: this.state.activeSort,
        direction: this.state.sortDirection,
      });
    });
  };

  handleFilterChange = (group) => {
    let groupFilterby;
    group === "all" ? (groupFilterby = "") : (groupFilterby = group);
    const searchParams = new URLSearchParams(this.props.location.search);
    searchParams.set("group", groupFilterby);
    this.props.history.push(`/employee?${searchParams.toString()}`);
    const filterBy = this.props.buildFilterBy(
      searchParams,
      this.props.filterBy
    );
    this.setState({ activeGroupFilter: group }, () =>
      this.props.setFilter(filterBy)
    );
  };

  render() {
    const { sortDirection } = this.state;
    const groupsMap = [
      { name: "All Employees", filterBy: "all" },
      { name: "Wifi", filterBy: "wifi" },
      { name: "Web", filterBy: "web" },
      { name: "Algorithms", filterBy: "algorithms" },
      { name: "Automation Infra", filterBy: "automation infra" },
      { name: "Business", filterBy: "business" },
      { name: "Human-Resources", filterBy: "human-resources" },
    ];
    return (
      <section className="Employee-dropdowns-row">
        <div className="filter-select-container">
          <div className="dropdown-title">Group:</div>
          <Select
            name="activeGroupFilter"
            value={this.state.activeGroupFilter}
            onChange={this.handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            {groupsMap.map((group, idx) => (
              <MenuItem value={group.filterBy} key={idx}>
                {group.name}
              </MenuItem>
            ))}
          </Select>
        </div>
        <div className="sort-select-container">
          <div className="dropdown-title">Sort by:</div>
          <Select
            name="activeSort"
            value={this.state.activeSort}
            onChange={this.handleChange}
            inputProps={{ "aria-label": "Without label" }}
          >
            <MenuItem value={"name"}>Name</MenuItem>
            <MenuItem value={"salary"}>Salary</MenuItem>
            <MenuItem value={"seniority"}>Seniority</MenuItem>
          </Select>
          <div className="sort-btns flex">
            <ArrowUpwardIcon
              onClick={() => this.onClickSortButtons("up")}
              fontSize="small"
              htmlColor={sortDirection === "up" ? "#0ec9ae" : ""}
            />
            <ArrowDownwardIcon
              onClick={() => this.onClickSortButtons("down")}
              fontSize="small"
              htmlColor={sortDirection === "down" ? "#0ec9ae" : ""}
            />
          </div>
        </div>
      </section>
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
};

export const EmployeeDropdownsRow = connect(
  mapStateToProps,
  mapDispatchToProps
)(withRouter(_EmployeeDropdownsRow));
