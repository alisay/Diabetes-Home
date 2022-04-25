const Clinician = require('../models/dummyClinician')

const displayPatients = (req, res) => {
    // const patients = Clinician.filter(id => id=='1001').patients[0]
    // console.log(Clinician.filter(id => id.word=='hello'))
    console.log(Clinician.dictionary)
    res.render('dashboard', {data: Clinician})
}

module.exports = {
    displayPatients, 
    // displayPatient,
    // createPatient,
    // removePatient,
}