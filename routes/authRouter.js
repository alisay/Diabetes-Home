import express from 'express';
import passport from 'passport';
import { Joi, celebrate } from 'celebrate';
import {
    logOut,
    loginNew,
    loginCreate,
    forgotPassword,
    resetPassword,
    sendResetPassword,
    registerClinician,
} from '../controllers/authController.js';
import { userValidationRules, validate } from '../middleware/validator.js';
import { isLoggedOut } from '../middleware/auth.js';

const router = express.Router();

// POST Route for registering and creating a user
router.post('/register', userValidationRules(), validate, registerClinician);

// GET Route for Login page
router.get('/login', isLoggedOut, loginNew);

// POST Route for finding the user and logging them in
router.post(
    '/login',
    celebrate({
        body: {
            cred: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    passport.authenticate('local', {
        session: false,
        failureRedirect: '/login',
        failureFlash: true,
    }),
    loginCreate,
);

// GET Route for Logout function
router.get('/logout', logOut);

// POST route for sending password reset link
router.post('/forgot-password', forgotPassword);

// GET route for getting password reset page
router.get('/reset-password', resetPassword);

// PUT route for update password from reset page
router.put('/update-password', sendResetPassword);

export default router;
