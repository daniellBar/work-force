import { httpService } from "./httpService.js";

const STORAGE_KEY = "user";

export const userService = {
  login,
  getUser,
  logout,
};

async function login(userCreds) {
  const user = await httpService.post("auth/login", userCreds);
  return _handleLogin(user);
}

async function logout() {
  await httpService.post(`auth/logout`);
  sessionStorage.clear();
}

function getUser() {
  return _loadUser();
}

function _handleLogin(user) {
  sessionStorage.setItem(STORAGE_KEY, JSON.stringify(user));
  return user;
}

function _loadUser() {
  return JSON.parse(sessionStorage.getItem(STORAGE_KEY));
}
