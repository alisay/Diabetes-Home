const express = require('express');
const router = express.Router();
const { 
  loginAdmin,
  sendAdmin,
  logout,
  registerNew,
  registerCreate
} = require('../controllers/auth_controller')

// POST on /auth/login
// Login for Admin
router.post("/login", loginAdmin, sendAdmin);

// GET on /auth/login
// Logout for Admin
router.get('/logout', logout)

// just for creating the Admin user account with an encrypted password
// router.get('/register', registerNew);
// router.post('/register', registerCreate);

// GET on /auth/admin
// retrieving session info
router.get('/admin', sendAdmin)

module.exports = router;
