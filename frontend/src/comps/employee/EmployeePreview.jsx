import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

export class EmployeePreview extends Component {

  state = {
    isCollapsed: false
  }

  convertTimePeriods(months) {
    let periodsToDisplay = 'months'
    const numberToDisplay = months < 12 ? months : Math.floor((months / 12) * 10) / 10
    if (numberToDisplay !== months) {
      periodsToDisplay = numberToDisplay === 1 ? 'year' : 'years'
    }
    return `${numberToDisplay} ${periodsToDisplay}`
  }

  onDelete = (ev, employeeId) => {
    ev.stopPropagation()
    this.props.onDelete(employeeId);
  }

  onToggleExpend = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  modifyLongText = (str) => {
    const modifiedStr = str.length > 30 ? `${str.substring(0, 23)}...` : str
    return modifiedStr
  }

  render() {
    const { employee } = this.props
    const { isCollapsed } = this.state
    return (
      <div className="employee-preview-container">
        <div className="employee-preview">
          <div className="col0">
            <img className="profile-img" src={employee.imgUrl} alt="profile-img" />
          </div>
          <div className="col1">
            <div className="name bold">{employee.name}</div>
            <div className="position light">{this.modifyLongText(employee.position)}</div>
            <div className="position light">{employee.mail}</div>
          </div>
          <div className="col2">
            <div className="sal bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS' }).format(employee.salary)}</div>
          </div>
          <div className="col3">
            <div className="seniority bold">{this.convertTimePeriods(employee.seniority)}</div>
          </div>
          <div className="col4">
            <div className="btn edit-btn">
              <EditIcon />
            </div>
            <div className="vl"></div>
            <div className="btn del-btn" onClick={(ev) => this.onDelete(ev, employee._id)}>
              <DeleteForeverIcon />
            </div>
          </div>
          <div className="col5">
            <div className="btn collapse-accordion-btn" onClick={this.onToggleExpend}>
              {!isCollapsed && <ArrowDropDownIcon fontSize='large' htmlColor='#ffffff'/>}
              {isCollapsed && <ArrowDropUpIcon fontSize='large' htmlColor='#ffffff'/>}
            </div>
          </div>
        </div>

        {isCollapsed && <div className="preview-accordion flex">
          <div className="preview-accordion-content flex column">
            <div className="salary bold">Salary:</div>
            <div className="salary light">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS' }).format(employee.salary)}</div>
            <div className="seniority bold">Seniority:</div>
            <div className="seniority light">{this.convertTimePeriods(employee.seniority)}</div>
          </div>
          <div className="preview-accordion-btns-container flex">
            <div className="btn edit-btn">
              <EditIcon />
            </div>
            <div className="vl"></div>
            <div className="btn del-btn" onClick={(ev) => this.onDelete(ev, employee._id)}>
              <DeleteForeverIcon />
            </div>
          </div>
        </div>}
      </div>

    )
  }
}
