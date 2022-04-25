const User = require('../models/dummyData/dummyUser')

const displayDashboard = (req, res) => {
    res.render('dashboard', {data: User})
}

module.exports = {
    displayPatients, 
    // displayPatient,
    // createPatient,
    // removePatient,
}