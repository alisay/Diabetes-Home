const Clinician = require('../models/clinician');

// GET USER BY NAME PARAMS for ACCOUNT SETTINGS
const getUserByParam = function (req) {
    // console.log(req.params.username)
    return Clinician.findOne({ username: req.params.username });
};

//For update settings
const updateUser = function (req) {
    return Clinician.findOneAndUpdate({ username: req.params.username }, req.body, {
        new: true
    });
};
 

//For sending reset link
const updateForForgotPassword = function (req) {
    return Clinician.findOne({ email: req.body.email })
};


//Inserting the token into user
const insertPasswordToken = function (user, token) {
    return Clinician.findOneAndUpdate({
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
const findForResetPassword = function (req) {
    return Clinician.findOne({
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    })
};


//For updating the new password
const findForUpdatePassword = function (req) {
    return Clinician.findOneAndUpdate({
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
const deleteUser = function (id) {
    return Clinician.findByIdAndRemove(id);
};

module.exports = {
    updateUser,
    deleteUser,
    getUserByParam,
    updateForForgotPassword,
    findForResetPassword,
    findForUpdatePassword,
    insertPasswordToken
}
