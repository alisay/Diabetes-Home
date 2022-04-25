const User = require('../models/dummyUser')

const displayDashboard = (req, res) => {
    const myDetails = User.filter(datum=>datum.username==='Jones')
    res.render('dashboard', {data: myDetails})
}

module.exports = {
    displayDashboard, 
}