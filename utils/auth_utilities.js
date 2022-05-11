import { User } from '../models/user.js';

// GET USER BY NAME PARAMS for ACCOUNT SETTINGS
export const getUserByParam = function (req) {
    // console.log(req.params.username)
    return User.findOne({ username: req.params.username });
};

//For update settings
export const updateUser = function (req) {
    return User.findOneAndUpdate({ username: req.params.username }, req.body, {
        new: true
    });
};
 

//For sending reset link
export const updateForForgotPassword = function (req) {
    return User.findOne({ email: req.body.email })
};


//Inserting the token into user
export const insertPasswordToken = function (user, token) {
    return User.findOneAndUpdate({
        email: user.email
    },
        {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
        },
        { //options
            returnNewDocument: true,
            new: true,
            strict: false
        });
};


//For checking password page get request
export const findForResetPassword = function (req) {
    return User.findOne({
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    })
};


//For updating the new password
export const findForUpdatePassword = function (req) {
    return User.findOneAndUpdate({
        username: req.body.username,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    }, { password: req.body.password }, {
        new: true
    });
};



// delete User
// returns a query
export const deleteUser = function (id) {
    return User.findByIdAndRemove(id);
};

// module.exports = {
//     updateUser,
//     deleteUser,
//     getUserByParam,
//     updateForForgotPassword,
//     findForResetPassword,
//     findForUpdatePassword,
//     insertPasswordToken
// }
