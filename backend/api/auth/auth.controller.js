const authService = require("./auth.service");
const logger = require("../../services/logger.service");

async function login(req, res) {
  console.log("req.body-", req.body);
  const credentials = req.body;
  try {
    const user = await authService.login(credentials);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    res.status(401).send(err);
  }
}

async function signup(req, res) {
  try {
    console.log("reqBODY-", req.body);
    const { password, userName } = req.body;
    const account = await authService.signup(password, userName);
    logger.debug(
      `auth.route - new account created: ` + JSON.stringify(account)
    );
    const user = await authService.login(email, password);
    req.session.user = user;
    res.json(user);
  } catch (err) {
    logger.error("[SIGNUP] " + err);
    res.status(500).send({ error: "could not signup, please try later" });
  }
}

async function logout(req, res) {
  try {
    req.session.destroy();
    res.send({ message: "logged out successfully" });
  } catch (err) {
    res.status(500).send({ error: err });
  }
}

module.exports = {
  login,
  signup,
  logout,
};
