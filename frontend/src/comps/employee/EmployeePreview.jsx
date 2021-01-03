import React, { Component } from "react";
import EditIcon from '@material-ui/icons/Edit';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';

export class EmployeePreview extends Component {

  convertTimePeriods(months) {
    let periodsToDisplay = 'months'
    const numberToDisplay = months < 12 ? months : Math.floor((months / 12) * 10) / 10
    if (numberToDisplay != months) {
      periodsToDisplay = numberToDisplay === 1 ? 'year' : 'years'
    }
    return `${numberToDisplay} ${periodsToDisplay}`
  }

  onDelete = (ev, employeeId) => {
    ev.stopPropagation()
    this.props.onDelete(employeeId);
  }

  modifyLongText = (str) => {
    const modifiedStr = str.length > 30 ? `${str.substring(0, 23)}...` : str
    return modifiedStr
}

render() {
  const { employee } = this.props
  return (
    <div className="employee-preview">
      <div className="col0">
        <img className="profile-img" src={employee.imgUrl} />
      </div>
      <div className="col1">
        <div className="name bold">{employee.name}</div>
        <div className="position light">{this.modifyLongText(employee.position)}</div>
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
    </div>
  )
}
}
