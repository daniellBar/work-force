import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';

import { utilsService } from '../../services/utilsService.js'



export class EmployeePreview extends Component {

  state = {
    isCollapsed: false,
  }

  handleSeniorityDisplay({ seniority, createdAt }) {
    const months = createdAt ? this._convertTimePeriods(createdAt) : seniority
    return this._createStringForSeniorityDisplay(months)
  }

  _convertTimePeriods(createdAt) {
    const employeeCreationDate = new Date(createdAt)
    const now = new Date(Date.now())
    return utilsService.getMonthsDiffBetweenDates(employeeCreationDate, now)
  }

  _createStringForSeniorityDisplay(months) {
    if (months > 11) {
      const years = Math.floor((months / 12) * 10) / 10
      return `${years} ${years === 1 ? 'year' : 'years'}`
    }

    else {
      return `${months} months`
    }
  }

  onDelete = (ev, employeeId) => {
    ev.stopPropagation()
    this.props.onDelete(employeeId);
  }

  onToggleExpend = () => {
    this.setState({ isCollapsed: !this.state.isCollapsed })
  }

  onClickEditBtn = (employee) => {
    this.props.setSelectedEmployee(employee)
    this.props.toggleModal()
  }

  modifyLongText = (str) => {
    const modifiedStr = str.length > 25 ? `${str.substring(0, 20)}...` : str
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
            <div className="position light">{this.modifyLongText(employee.mail)}</div>
          </div>
          <div className="col2">
            <div className="sal bold">{new Intl.NumberFormat('en-US', { style: 'currency', currency: 'ILS' }).format(employee.salary)}</div>
          </div>
          <div className="col3">
            <div className="seniority bold">{this.handleSeniorityDisplay({ seniority: employee.seniority, createdAt: employee.createdAt })}</div>
          </div>
          <div className="col4">
            <div className="btn edit-btn" onClick={() => this.onClickEditBtn(employee)}>
              <EditIcon />
            </div>
            <div className="vl"></div>
            <div className="btn del-btn" onClick={(ev) => this.onDelete(ev, employee._id)}>
              <DeleteForeverIcon />
            </div>
          </div>
          <div className="col5">
            <div className="btn collapse-accordion-btn" onClick={this.onToggleExpend}>
              {!isCollapsed && <ArrowDropDownIcon fontSize='large' htmlColor='#ffffff' />}
              {isCollapsed && <ArrowDropUpIcon fontSize='large' htmlColor='#ffffff' />}
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
            <div className="btn edit-btn" onClick={() => this.onClickEditBtn(employee)}>
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
