import express from 'express';
const router = express.Router();
<<<<<<< HEAD
const {
  login,
  loginAdmin,
  // sendAdmin,
  logout,
  registerNew,
  registerCreate
} = require('../controllers/auth_controller')
=======
import * as Auth from '../controllers/authController.js';
>>>>>>> test
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
<<<<<<< HEAD
router.get("/login", login)

// POST on /auth/login
// Login for Admin
router.post("/login", loginAdmin);
=======
router.get("/login", Auth.login)

// POST on /auth/login
// Login for Admin
router.post("/login", Auth.loginAdmin);
>>>>>>> test

// GET on /auth/logout
// Logout for Admin
router.get('/logout', Auth.logout)

// just for creating the Admin user account with an encrypted password
router.get('/register', Auth.registerNew);
router.post('/register', Auth.registerCreate);

// GET on /auth/admin
// retrieving session info
<<<<<<< HEAD
// router.get('/admin', sendAdmin)
=======
router.get('/admin', Auth.sendAdmin)
>>>>>>> test

export default router;
