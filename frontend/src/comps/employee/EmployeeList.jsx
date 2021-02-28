import React from "react";
import { EmployeePreview } from './EmployeePreview'

export function EmployeeList({ employees, onDelete, onToggleModal, onSetSelectedEmployee }) {
  return (
    <div className="employee-list">
      {
        employees.map(employee => <EmployeePreview employee={employee} key={employee._id} onDelete={onDelete} onSetSelectedEmployee={onSetSelectedEmployee} onToggleModal={onToggleModal} />)
      }
    </div>
  )
}

