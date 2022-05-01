import User from '../models/dummyData/dummyUser.js';

export const displayDashboard = (req, res) => {
    res.render('dashboard', {data: User})
}
