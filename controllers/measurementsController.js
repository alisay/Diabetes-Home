import measurements from '../models/measurements.js';

//GET all glucose measurements according to patient ID
export async function getGlucose(req, res, next) {
    const myGlucose = await measurements.find({"metadata.patient": "6265edce2cc273a8c7c696dc"})
                                    .sort({"timestamp":-1})
                                    .lean()
    return res.render('glucose', {headTitle: 'Glucose', glucoseData: myGlucose})
}

//CREATE new glucose entry
export async function createGlucose(req, res, next) {
    const { comment, glucose } = req.body;
    const metadata = {"patient":"6265edce2cc273a8c7c696dc", comment}
    const timestamp = new Date(Date.now())
    // const entry = {
    //     "patient": "6265edce2cc273a8c7c696dc",
    //     "glucose": "53.5",
    //     "timestamp": "2021-05-18T00:00:00.000Z"
    // }
    await measurements.create({ metadata, glucose, timestamp });
    res.redirect('/glucose')
}
