const User = require('../models/dummyUser')
const Weight = require('../models/dummyWeight')

const displayDashboard = (req, res) => {
    const myDetails = User.filter(datum=>datum.username==='Jones')
    const myWeight = Weight.filter(entry=>entry.metadata.patientID=='2002')
    res.render('dashboard', {weight: myWeight, data: myDetails})
}  
module.exports = {
    displayDashboard, 
}