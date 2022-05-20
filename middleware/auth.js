export function isLoggedOut(req, res, next) {
    if (req.user != null) {
        res.redirect("/");
        return;
    }
    
    next();
}

export function isLoggedIn(req, res, next) {
    if (req.user == null) {
        res.status(401).redirect("/login");
        return;
    }

    next();
}

export function isPatient(req, res, next) {
    if (req.user.kind !== "Patient") {
        res.status(401).redirect("/dashboard");
    } 

    next();
}

export function isClinician(req, res, next) {
    if (req.user.kind !== "Clinician") {
        res.status(401).redirect("/dashboard");
    } 

    next();
}
