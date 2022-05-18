import measurements from '../models/measurements.js';

// GET all glucose measurements according to patient ID
export async function getGlucose(req, res, next) {
    const myGlucose = await measurements.find({ 'metadata.patient': '6265edce2cc273a8c7c696dc' })
        .sort({ timestamp: -1 })
        .lean();
    return res.render('glucose', { headTitle: 'Glucose', glucoseData: myGlucose });
}

// CREATE new glucose entry
export async function createGlucose(req, res, next) {
    let { comment, glucose } = req.body;
    glucose = { measurement: glucose, comment };
    // hard-coded patient
    metadata = '6265edce2cc273a8c7c696dc';
    const timestamp = new Date(Date.now());
    await measurements.create({ metadata, glucose, timestamp });
    res.redirect('/patientDashboard');
}
