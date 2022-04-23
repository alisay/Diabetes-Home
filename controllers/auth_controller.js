const AdminModel = require('../models/admin')
const passport = require("passport");

// admin login authentication with passport js
async function loginAdmin(req, res, next) {
  console.log('logging in Admin');
  const passportLogin = passport.authenticate("local");
  await passportLogin(req, res, next)
}

// send admin session info to client
function sendAdmin(req, res) {
  console.log('sending admin session info');
  res.status(200)
  res.json({
    admin: req.user,
    sessionID: req.sessionID
  })
}


// Admin logout
function logout(req, res) {
  
  // checks if admin is logged on first
  if (req.isAuthenticated()) {
    req.logout()
    return res.sendStatus(200)
  }

  return res.sendStatus(401)
}

// registerNew and registerCreate are only for creating the Admin account
function registerNew(req, res) {
    res.render("register");
}

async function registerCreate(req, res, next) {
    const { username, password } = req.body;
    await AdminModel.create({ username, password });
    res.redirect('/')
}

module.exports = {
  loginAdmin,
  sendAdmin,
  logout,
  registerCreate,
  registerNew
}
