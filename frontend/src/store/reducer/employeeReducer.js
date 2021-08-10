
const initialState = {
    employees: []
}

export function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {
                ...state,
                employees: action.employees
            }
        case 'REMOVE_EMPLOYEE':
            return {
                ...state, employees: state.employees.filter(employee => employee._id !== action.employeeId)
            }
        case 'EDIT_EMPLOYEE':
            return {
                ...state,
                employees: state.employees.map(employee => {
                    return employee._id === action._employee._id ? action._employee : employee
                })
            }
        case 'ADD_EMPLOYEE':
            return {
                ...state,
                employees: [...state.employees, action._employee]
            }
        default:
            return state;
    }
}