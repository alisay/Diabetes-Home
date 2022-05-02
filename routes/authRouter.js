import express from 'express';
const router = express.Router();
import * as Auth from '../controllers/authController.js';
// const { isAuthenticated } = require('../middleware/passport')

const isAuthenticated = (req, res, next) => {
  // If user is not authenticated via passport, redirect to login page 
  if (!req.isAuthenticated()) { 
    return res.redirect('/') 
  }
  // Otherwise, proceed to next middleware function
  return next()
}

//test authentication
router.get("/", isAuthenticated, (req, res) => {
  res.render('logout', { title: 'Logout'})
}
)

//GET on /auth/login
router.get("/login", Auth.login)

// POST on /auth/login
// Login for Admin
router.post("/login", Auth.loginAdmin);

// GET on /auth/login
// Logout for Admin
router.get('/logout', Auth.logout)

// just for creating the Admin user account with an encrypted password
router.get('/register', Auth.registerNew);
router.post('/register', Auth.registerCreate);

// GET on /auth/admin
// retrieving session info
router.get('/admin', Auth.sendAdmin)

export default router;
