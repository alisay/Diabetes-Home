import * as models from './models/index.js';

export function getClinician(username) {
    return models.Clinician.findOne({ username }).lean();
}

export function getPatientId(_id) {
    return models.Patient.findOne({ _id }).lean();
}

export function getPatient(username) {
    return models.Patient.findOne({ username }).lean();
}

export function updatePatient(username, details) {
    return models.Patient.updateOne({ username }, details);
}

export const getAllPatients = function (req) {
    return Clinician.findOne({ username: req.params.username });
};

// ADD Patient
export async function createPatient(req, res) {
    const { email, password, username } = req.body;
    const clinician = req.user;

    try {
        var newPatient = await models.Patient.create({ email, password, username, clinician: clinician._id });
    }
    catch (err) {
        res.send(err);
        return;
    };

    clinician.patients.push(newPatient._id);
    console.log(newPatient);

    await models.Clinician.findOneAndUpdate({
        username: clinician.username
    }, {
        patients: clinician.patients,
    });

    return newPatient;
};


export function getPatientData(_id, type, timeframe = 28) {
    const date = new Date();
    date.setHours(0, 0, 0, 0);
    date.setDate(date.getDate() - timeframe + 1); // +1 as today is the last day

    return models.Measurements.find({
        metadata: { user: _id, type },
        timestamp: { $gt: date },
    }).sort({ timestamp: 1 }).lean();
}

// Later we will want to make a task for this instead of fetching top 5 from DB each time
export function getLeaderboard() {
    return models.Patient.find()
        .sort({ engagementRate: -1 })
        .limit(5)
        .select(['nickname', 'streak', 'engagementRate'])
        .lean();
}

// For sending reset link
export function updateForForgotPassword (req) {
    return models.User.findOne({ email: req.body.email });
};

// Inserting the token into user
export function insertPasswordToken (user, token) {
    return models.User.findOneAndUpdate(
        {
            email: user.email,
        },
        {
            resetPasswordToken: token,
            resetPasswordExpires: Date.now() + 3600000,
        },
        { // options
            returnNewDocument: true,
            new: true,
            strict: false,
        },
    );
};

// For checking password page get request
export function findForResetPassword (req) {
    return User.findOne({
        resetPasswordToken: req.query.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    });
};

// For updating the new password
export function findForUpdatePassword (req) {
    return User.findOneAndUpdate({
        username: req.body.username,
        resetPasswordToken: req.body.resetPasswordToken,
        resetPasswordExpires: {
            $gt: Date.now(),
        },
    }, { password: req.body.password }, {
        new: true,
    });
};
