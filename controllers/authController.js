import admin from '../models/admin.js';
import passport from "passport";

export const login = (req, res) => {
  res.render('login')
}

// admin login authentication with passport js
export async function loginAdmin(req, res, next) {
  console.log('logging in Admin');
  const passportLogin = passport.authenticate("local", {
    successRedirect: '/auth/logout', 
    failureRedirect: '/auth/login'
  });
  await passportLogin(req, res, next)
}

// send admin session info to client
export function sendAdmin(req, res) {
  console.log('sending admin session info');
  // res.redirect()
  res.status(200)
  res.json({
    admin: req.user,
    sessionID: req.sessionID
  })
}


// Admin logout
export function logout(req, res) {

  // checks if admin is logged on first
  if (req.isAuthenticated()) {
    req.logout()
    return res.redirect('/')
  }

  return res.sendStatus(401)
}

// registerNew and registerCreate are only for creating the Admin account
export function registerNew(req, res) {
  res.render("register");
}

export async function registerCreate(req, res, next) {
  const { username, password } = req.body;
  await admin.create({ username, password });
  res.redirect('/')
}

