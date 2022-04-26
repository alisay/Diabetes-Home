const express = require('express');
const router = express.Router();
const {
    displayDashboard, 
    differentiateDashboard,
} = require('../controllers/page_controller')


//GET Route for Dashboard 
router.get("/dashboard", displayDashboard)

//POST Route for Patient/Clinician differentiation (Deliverable Two)
router.post("/dashboard", differentiateDashboard)


module.exports = router;
