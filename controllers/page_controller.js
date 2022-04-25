const User = require('../models/dummyData/dummyUser')
const Weight = require('../models/dummyData/dummyWeight')

const displayDashboard = (req, res) => {
    const myDetails = User.filter(datum=>datum.username==='Jones')
    const myWeight = Weight.filter(entry=>entry.metadata.patientID=='2002')
    res.render('dashboard', {headTitle: 'Dashboard', weight: myWeight, data: myDetails})
}  
module.exports = {
    displayDashboard, 
}