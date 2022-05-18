import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import nodemailer from 'nodemailer';
import { Clinician, Patient, User } from '../models/user.js';

import {
    updateUser,
    getUserByParam,
    updateForForgotPassword,
    findForResetPassword,
    findForUpdatePassword,
    insertPasswordToken,
} from '../utils/auth_utilities.js';

/// JWT TOKEN CONFIG
const configToken = {
    // Delete the cookie after 90 days
    expires: new Date(Date.now() + 90 * 24 * 60 * 60 * 1000),
    httpOnly: true,
};

// In production, set the cookie's Secure flag
// to ensure the cookie is only sent over HTTPS
if (process.env.NODE_ENV === 'production') {
    configToken.secure = true;
    configToken.sameSite = 'none';
}

// REGISTER USER
export function registerNew(req, res) {
    res.render('aboutWebsite', { css: 'stylesheets/index.css' });
}

export function register(req, res, next) {
    if (req.user == null) return registerClinician(req, res, next);
    if (req.user.type === 'clinician') return registerPatient(req, res, next);
    return res.redirect('/');
}

export async function registerClinician(req, res, next) {
    const newUserHandler = (user) => {
        req.login(user, (err) => {
            if (err) {
                next(err);
            } else {
                const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
                res.cookie('jwt', token, configToken);
                res.send(user);
                // res.render('accountSettings', {user: user});
            }
        });
    };
    const {
        firstName, lastName, username, email, password,
    } = req.body;

    Clinician.create({
        firstName, lastName, username, email, password,
    })
        .then(newUserHandler)
        .catch((x) => res.send(x));
}

export async function registerPatient(req, res, next) {
    const user = await Patient.create(req.body); // dangerous?
}

// LOGOUT USER
export function logOut(req, res) {
    req.logout();
    res.cookie('jwt', null, { maxAge: -1 });
    // res.sendStatus(200);
    res.render('logout');
}

export function loginNew(req, res) {
    // req.flash('errorMessage', 'Unauthorised');
    // console.log(req.flash())
    res.render('login', { flash: req.flash('error'), title: 'Login', css: 'stylesheets/index.css' });
}

// LOGIN USER
export function loginCreate(req, res) {
    const token = jwt.sign({ sub: req.user._id }, process.env.JWT_SECRET);
    res.cookie('jwt', token, configToken);

    res.redirect("/dashboard");
}

// Account settings get ROUTE
export function editUser(req, res) {
    // console.log(req.user)
    getUserByParam(req).exec((err, user) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message,
            });
        }
        if (user !== null) {
            res.status(200);
            res.send(user);
        } else {
            res.status(404);
            return res.json({
                error: 'there is no user found',
            });
        }
    });
}

// Account settings PATCH ROUTE
export function editUserReq(req, res) {
    updateUser(req).exec((err, user) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err.message,
            });
        }
        res.status(200);
        res.send(user);
    });
}

// Forgot password POST ROUTE
export function forgotPassword(req, res) {
    if (req.body.email === '') {
        res.status(400).send('email required');
    }
    // console.error(req.body.email)
    updateForForgotPassword(req).then((user) => {
        if (user === null) {
            res.status(403).send("Sorry, we can't send you a link to reset your password.");
        } else {
            const token = crypto.randomBytes(20).toString('hex');

            insertPasswordToken(user, token).exec((err, user) => {
                if (err) {
                    console.log(err);
                }
                return user;
            });

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: `${process.env.EMAIL_ADDRESS}`,
                    pass: `${process.env.EMAIL_PASSWORD}`,
                },
            });

            if (process.env.NODE_ENV === 'production') {
                'https://home-diabetes.herokuapp.com/';
            }

            const url = process.env.NODE_ENV === 'production' ? 'https://home-diabetes.herokuapp.com/' : 'http://localhost:8080/';

            console.log(user);

            const mailOptions = {
                from: 'diabetes.at.home.app@gmail.com',
                to: `${user.email}`,
                subject: 'Link To Reset Password',
                text:
          'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n'
          + 'Please click on the following link, or paste this into your browser to complete the process within one hour of receiving it:\n\n'
          + `${url}user/reset-password/?resetPasswordToken=${token}\n\n`
          + 'If you did not request this, please ignore this email and your password will remain unchanged.\n',
            };

            console.log('sending mail');
            transporter.sendMail(mailOptions, (err, response) => {
                if (err) {
                    console.error('there was an error: ', err);
                } else {
                    console.log('here is the res: ', response);
                    res.status(200).json('recovery email sent');
                }
            });
        }
    });
}

// Reset password GET ROUTE
export function resetPassword(req, res) {
    findForResetPassword(req).then((user) => {
        if (user == null) {
            res.status(403).send('password reset link is invalid or has expired');
        } else {
            res.status(200).send({
                username: user.username,
                message: 'password reset link a-ok',
            });
        }
    });
}

// Update password PATCH ROUTE
export function sendResetPassword(req, res) {
    findForUpdatePassword(req).exec((err, user) => {
        if (err) {
            res.status(500);
            return res.json({
                error: err,
            });
        }
        res.status(200);
        res.send({
            username: user.username,
            message: 'password updated',
        });
    });
}

// //DELETE USER
// const removeUser = function (req, res) {
//     // execute the query from deletePost
//     deleteUser(req.session.passport.user).exec((err) => {
//         if (err) {
//             res.status(500);
//             return res.json({
//                 error: err.message
//             });
//         }
//         res.sendStatus(204);
//         //res.redirect("/home")
//     });
// };
