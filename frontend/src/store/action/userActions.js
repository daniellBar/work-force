import { userService } from "../../services/userService.js";

export function loadUser() {
  return async (dispatch) => {
    try {
      const user = await userService.getUser();
      dispatch({ type: "SET_USER", user });
    } catch (err) {
      console.log("UserActions: err in loadUser", err);
    }
  };
}

export function removeUser(userId) {
  return async (dispatch) => {
    try {
      await userService.remove(userId);
      dispatch({ type: "REMOVE_USER", userId });
    } catch (err) {
      console.log("UserActions: err in removeUser", err);
    }
  };
}

export function login(userCreds) {
  return async (dispatch) => {
    try {
      const user = await userService.login(userCreds);
      dispatch({ type: "SET_USER", user });
    } catch (err) {
      console.log("userActions: err in login ", err);
    }
  };
}
export function signup(userCreds) {
  return async (dispatch) => {
    const user = await userService.signup(userCreds);
    dispatch({ type: "SET_USER", user });
  };
}

export function logout() {
  return async (dispatch) => {
    try {
      await userService.logout();
      dispatch({ type: "SET_USER", user: null });
    } catch (err) {
      console.log("userActions: err in logout ", err);
    }
  };
}
