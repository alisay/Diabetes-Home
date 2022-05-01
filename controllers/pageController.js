import User from '../models/dummyData/dummyUser.js'
import Weight from '../models/dummyData/dummyWeight.js'

export const differentiateDashboard = (req, res) => {
    //This is just for deliverable two where users maybe be hard-coded
    const {userType} = req.body 
    let user
    userType === 'clinician' ? user = User.filter(x=>x.id=='999') : user = User.filter(x=>x.id=='6265edce2cc273a8c7c696dc')
    res.render('dashboard', {headTitle: 'Dashboard', myProfile: user})
}

export const displayDashboard = (req, res) => {
    res.render('dashboard', { name: "Jeff" });
    // const myDetails = User.filter(datum=>datum.username==='Chris')
    // const myWeight = Weight.filter(entry=>entry.metadata.patientID=='2002')
    // res.render('dashboard', {headTitle: 'Dashboard', weight: myWeight, data: myDetails, TESTING: false})
}  