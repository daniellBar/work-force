import React from "react";
import { EmployeePreview } from './EmployeePreview'

export function EmployeeList({ employees, onDelete }) {
  return (
    <div className="employee-list">
      {
        employees.map(employee => <EmployeePreview employee={employee} key={employee._id} onDelete={onDelete} />)
      }
    </div>
  )
}

