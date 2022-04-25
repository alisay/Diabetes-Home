const express = require('express');
const router = express.Router();
const {
    displayDashboard, 
} = require('../controllers/page_controller')


//GET Route for Dashboard 
router.get("/dashboard", displayDashboard)

module.exports = router;
