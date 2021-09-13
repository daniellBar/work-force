import React from "react";
import { EmployeePreview } from "./EmployeePreview";

export function EmployeeList({
  employees,
  onDelete,
  toggleModal,
  setSelectedEmployee,
}) {
  return (
    <div className="employee-list">
      {employees.map((employee) => (
        <EmployeePreview
          employee={employee}
          key={employee._id}
          onDelete={onDelete}
          setSelectedEmployee={setSelectedEmployee}
          toggleModal={toggleModal}
        />
      ))}
    </div>
  );
}
