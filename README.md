# Diabetes@Home

A user-friendly web app for Diabetes patients to keep track of their vitals, and a platform for clinicians to monitor their patients.

### Group Members
* Alisa Blakeney 
* Jeff Li
* Minh Hoang
* Noah Stammbach


### Authorisation
----
POST '/auth/login'
- Login for Admin
- requires fields 'username' and 'password'

GET '/auth/logout'
- Logout for Admin

Things to do: 
Differentiate between patient/clinician dash 
Create a few users using new schema 
let clinician set threshold * use this to update view
