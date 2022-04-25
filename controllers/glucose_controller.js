const Glucose = require('../models/glucose')

async function createGlucose(req, res, next) {
    const { patient, glucose } = req.body;
    const timestamp = new Date(Date.now())
    // const entry = {
    //     "patient": "6265edce2cc273a8c7c696dc",
    //     "glucose": "53.5",
    //     "timestamp": "2021-05-18T00:00:00.000Z"
    // }
    await Glucose.create({ patient, glucose, timestamp});
    res.redirect('/')
  }

  module.exports = {
    createGlucose
  }
  