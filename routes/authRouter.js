const express = require('express');
const router = express.Router();
const passport = require("passport");
const {  Joi, celebrate,  } = require('celebrate');
const {registerCreate, 
  // registerNew , 
  logOut, 
  loginNew, 
  loginCreate, 
  editUser, 
  editUserReq, 
  forgotPassword,
  resetPassword,
  sendResetPassword} = require('../controllers/auth_controller')
const {userValidationRules, validate, accountSettingValidationRules} = require("../middleware/validator")

// const User = require('../models/clinician');


//GET Route for Register Page
//router.get('/register',authRedirect, registerNew);

//POST Route for registering and creating a user
router.post('/register', userValidationRules(), validate, registerCreate);

//GET Route for Login page
router.get("/login", loginNew)

//POST Route for finding the user and logging them in
router.post("/login", celebrate({
    body: {
        email: Joi.string().required(),
        password: Joi.string().required(),
    }}), 
    passport.authenticate('local', {
        session: false
}),loginCreate);


//GET Route for Logout function
router.get('/logout', logOut);

//GET Route for Account Settings Page
router.get("/:username/account-settings", passport.authenticate('jwt', {session: false}),  editUser)
//PATCH Route for Updating the user via account settings
router.patch("/:username/account-settings", accountSettingValidationRules(), validate, editUserReq)

//router.delete("/:name/delete", removeUser)

//POST route for sending password reset link
router.post('/forgot-password', forgotPassword)

//GET route for getting password reset page
router.get('/reset-password', resetPassword)

//PUT route for update password from reset page
router.put('/update-password', sendResetPassword)


module.exports = router