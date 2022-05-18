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
