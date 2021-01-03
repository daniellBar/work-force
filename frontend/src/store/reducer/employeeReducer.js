const initialState = {
    employees:[]
}

export function employeeReducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_EMPLOYEES':
            return {
                ...state,
                employees: action.employees
            }
            case 'REMOVE_EMPLOYEE':
                return { ...state, employees: state.employees.filter(employee => employee._id !== action.employeeId) }
        default:
            return state;
    }
}