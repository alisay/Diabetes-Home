const express = require('express');
const router = express.Router();
const {
  login,
  loginAdmin,
  // sendAdmin,
  logout,
  registerNew,
  registerCreate
} = require('../controllers/auth_controller')
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
router.get("/login", login)

// POST on /auth/login
// Login for Admin
router.post("/login", loginAdmin);

// GET on /auth/logout
// Logout for Admin
router.get('/logout', logout)

// just for creating the Admin user account with an encrypted password
router.get('/register', registerNew);
router.post('/register', registerCreate);

// GET on /auth/admin
// retrieving session info
// router.get('/admin', sendAdmin)

module.exports = router;
