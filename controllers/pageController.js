import { getUser } from "../dbutils.js";

// export const differentiateDashboard = (req, res) => {
//     //This is just for deliverable two where users maybe be hard-coded
//     const {userType} = req.body 
//     let user
//     userType === 'clinician' ? user = User.filter(x=>x.id=='999') : user = User.filter(x=>x.id=='6265edce2cc273a8c7c696dc')
//     res.render('patientDashboard', {headTitle: 'Dashboard', myProfile: user})
// }

export async function displayDashboard(req, res) {
    const hours = new Date().getHours();
    const timeString = hours < 12 ? 'morning' : hours < 19 ? 'afternoon' : 'evening';
    
    const user = await getUser("PatTap");

    res.render('patientDashboard', { 
        timeString, user, leaderboard: [],
        css: "stylesheets/patientDashboard.css" 
    });
}  