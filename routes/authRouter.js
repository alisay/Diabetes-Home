import express from 'express';
import passport from 'passport';
import { Joi, celebrate, errors } from 'celebrate';
import {
    registerNew,
    logOut,
    loginNew,
    loginCreate,
    editUser,
    editUserReq,
    forgotPassword,
    resetPassword,
    sendResetPassword,
    register,
} from '../controllers/authController.js';
import { userValidationRules, validate, accountSettingValidationRules } from '../middleware/validator.js';

const router = express.Router();

// GET Route for Register Page
router.get('/register', registerNew);

// POST Route for registering and creating a user
router.post('/register', userValidationRules(), validate, register);

// GET Route for Login page
router.get('/login', loginNew);

// POST Route for finding the user and logging them in
router.post(
    '/login',
    express.raw({ inflate: true, limit: '50mb', type: () => true }),
    (req, res) => console.log(req.body.toString()),
    celebrate({
        body: {
            email: Joi.string().required(),
            password: Joi.string().required(),
        },
    }),
    (err, req, res, next) => {console.log(err); console.log(req.body)}, 
    passport.authenticate('local', {
        session: false,
        failureRedirect: '/login',
        failureFlash: true,
    }),
    loginCreate,
);

// GET Route for Logout function
router.get('/logout', logOut);

// GET Route for Account Settings Page
router.get('/:username/account-settings', passport.authenticate('jwt', { session: false }), editUser);
// PATCH Route for Updating the user via account settings
router.patch('/:username/account-settings', accountSettingValidationRules(), validate, editUserReq);

// router.delete("/:name/delete", removeUser)

// POST route for sending password reset link
router.post('/forgot-password', forgotPassword);

// GET route for getting password reset page
router.get('/reset-password', resetPassword);

// PUT route for update password from reset page
router.put('/update-password', sendResetPassword);

export default router;
