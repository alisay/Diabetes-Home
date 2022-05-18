import express from 'express';
import passport from 'passport';
import * as Pages from '../controllers/pageController.js';

const router = express.Router();

// GET Route for Dashboard
router.get('/dashboard', passport.authenticate('jwt'), (req, res) => {
    if (req.user == null) return res.redirect("/");
    else if (req.user.kind === "Patient") return Pages.patientDashboard(req, res);
    else if (req.user.kind === "Clinician") return Pages.clinicianDashboard(req, res);
    else return res.redirect("/");
});

export default router;
