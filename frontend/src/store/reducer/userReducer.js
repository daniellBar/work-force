

let localLoggedinUser = null;
if (sessionStorage.user) localLoggedinUser = JSON.parse(sessionStorage.user);

const initialState = {
    loggedInUser: localLoggedinUser,
    users:[]
}

export function userReducer(state = initialState, action = {}) {
    switch (action.type) {
        case 'SET_USER':
            return { ...state, loggedInUser: action.user };
        case 'SET_USERS':
            return { ...state, users: action.users };
        default:
            return state
    }
}



