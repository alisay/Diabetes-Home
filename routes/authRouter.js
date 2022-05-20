import express from 'express';
import passport from 'passport';
import { Joi, celebrate, errors } from 'celebrate';
import {
    registerNew,
    logOut,
    loginNew,
    loginCreate,
    forgotPassword,
    resetPassword,
    sendResetPassword,
    register,
} from '../controllers/authController.js';
import { userValidationRules, validate, accountSettingValidationRules } from '../middleware/validator.js';

const router = express.Router();

// POST Route for registering and creating a user
router.post('/register', userValidationRules(), validate, register);

// GET Route for Login page
router.get('/login', loginNew);

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
