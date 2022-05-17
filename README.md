# Diabetes@Home

A user-friendly web app for Diabetes patients to keep track of their vitals, and a platform for clinicians to monitor their patients.

### Usage

* Install `node.js`
* Clone the repository
* Use `npm i` to install all required packages
* Create a mongo database and an email 
* Create environment variables `MONGO_URI`, `EMAIL_ADDRESS`, `EMAIL_PaSSWORD` and `JWT_SECRET` (using dotenv is optional)
* Run the app with `node app.js`

### Group Members
* Alisa Blakeney 
* Jeff Li
* Minh Hoang
* Noah Stammbach

### To Do 

when you log in you are redirected to patient or clinician dashboard depending on whether you are a clinician or not. 
home page has a link to your dashboard and a logout button if you are logged in 
you can edit your profile
a clinician can view all their patients
a clinician can edit their patients metrics

when you add a new clinician, it redirects to dashboard.