import express from 'express';
import passport from 'passport';
import { isLoggedIn, isClinician } from '../middleware/auth.js';
import * as Pages from '../controllers/pageController.js';

const router = express.Router();

// GET Route for Dashboard
router.get('/dashboard', passport.authenticate('jwt', { failureRedirect: "/login" }), (req, res) => {
    if (req.user.kind === "Patient") return Pages.patientDashboard(req, res);
    else if (req.user.kind === "Clinician") return Pages.clinicianDashboard(req, res);
    else return res.redirect("/");
});

router.get('/viewHistory', isLoggedIn, Pages.viewHistory);
router.get('/editPatient', isLoggedIn, isClinician, Pages.editPatient);

export default router;
