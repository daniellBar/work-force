const bcrypt = require("bcryptjs");
const userService = require("../user/user.service");
const logger = require("../../services/logger.service");

const saltRounds = 10;

async function login(credentials) {
  const { userName, password } = credentials;
  logger.debug(`auth.service - login with userName: ${userName}`);
  if (!userName || !password)
    return Promise.reject("userName and password are required!");
  const user = await userService.getByName(userName);
  if (!user) return Promise.reject("Invalid userName or password");
  const match = await bcrypt.compare(password, user.password);
  if (!match) return Promise.reject("Invalid userName or password");
  delete user.password;
  return user;
}

async function signup(password, userName) {
  logger.debug(`auth.service - signup with userName: ${userName}`);
  if (!password || !userName) return Promise.reject("all valids are required!");
  const hash = await bcrypt.hash(password, saltRounds);
  return userService.add({ password: hash, userName, isAdmin: false });
}

module.exports = {
  signup,
  login,
};
