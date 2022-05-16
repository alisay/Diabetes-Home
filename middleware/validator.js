import { body, validationResult, param } from 'express-validator'
import { User } from '../models/user.js';

//VALIDATION FOR USER REGISTRATION
export const userValidationRules = () => {
    return [
        body('email').isEmail().normalizeEmail().withMessage('Must be a valid email format').custom(value => {
          return new Promise((resolve, reject) => {
            User.findOne({email:value}, function(err, user){
              if(err) {
                reject(new Error('Server Error'))
              }
              if(Boolean(user)) {
               
                reject(new Error('E-mail already in use'))
              }
    
              resolve(true)
            });
          });
        }),
        body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
        body('username').isLength({ min: 5 }).withMessage('Must be 5 or more characters').custom(value => {
          return new Promise((resolve, reject) => {
            User.findOne({username:value}, function(err, user){
              if(err) {
                reject(new Error('Server Error'))
              }
              if(Boolean(user)) {
               
                reject(new Error('Username already in use'))
              }
    
              resolve(true)
            });
          });
        }),
      ]
  }
 
 //VALIDATION FOR ACCOUNTING SETTING UPDATE
 export const accountSettingValidationRules = () => {
    return [
        body('email').isEmail().normalizeEmail().withMessage('Must be a valid email format'),
        body('password').isStrongPassword({ minLength: 8, minLowercase: 1, minUppercase: 1, minNumbers: 1, minSymbols: 1}).withMessage('Password should not be empty, minimum eight characters, at least one letter, one number and one special character'),
        //body('username').matches(/^[A-Za-z\s]+$/).withMessage('Must be text only'),
      ]
  }

//VALIDATION FOR PARAMS 
export const usernameParamValidationRules = () => {
    return [
        param('username').exists().withMessage("Invalid request"),
      ]
  }
  
//VALIDATION ERRORS
export const validate = (req, res, next) => {
    const errors = validationResult(req)
    if (errors.isEmpty()) {
      return next()
    }
    const extractedErrors = []
    errors.array().map(err => extractedErrors.push({ [err.param]: err.msg }))
    // return res.status(422).json({
    //   errors: extractedErrors,
    // })
    return res.status(422).render('error', {
      errors: extractedErrors, 
      css: "stylesheets/index.css"
        })
  }
  
