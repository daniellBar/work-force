const initialState = {
  filterBy:{name:'',group:''}
}

export function filterReducer(state = initialState, action) {
  switch (action.type) {
    case 'SET_FILTER':
      return { ...state, filterBy: action.filterBy }
    default:
      return state;
  }
}