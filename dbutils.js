import * as models from "./models/index.js";

export function getClinician(username) {
    return models.Clinician.findOne({ username }).lean();
}

export function getPatientId(_id) {
    return models.Patient.findOne({ _id }).lean();
}

export function getPatient(username) {
    return models.Patient.findOne({ username }).lean();
}

// Later we will want to make a task for this instead of fetching top 5 from DB each time
export function getLeaderboard() {
    return models.Patient.find()
                         .sort({ engagementRate: -1 })
                         .limit(5)
                         .select(["nickname", "streak", "engagementRate"])
                         .lean();
}

export function getMeasurements(userId, type, timeframe = 30) {
    const minDate = new Date();
    minDate.setDate(minDate.getDate() - timeframe);
    return models.Measurements.find({ metadata: { user: userId, type },
                                      timestamp: { $gte: minDate }});
}
