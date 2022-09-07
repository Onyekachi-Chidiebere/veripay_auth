const express = require('express');
const createInstitution = require('./controllers/institution/createInstitution');
const createInstitutionLocation = require('./controllers/institution/createInstitutionLocation');
const resendOtp = require('./controllers/otp/resendOtp');
const verifyOtp = require('./controllers/otp/verifyOtp');
const createAdmin = require('./controllers/users/createAdmin');
const { loginPassword, loginEmail } = require('./controllers/users/login');

const router = express.Router();

router.post('/create-institution', createInstitution);
router.post('/create-institution-location', createInstitutionLocation);
router.post('/verify-otp', verifyOtp);
router.post('/resend-otp', resendOtp);
router.post('/create-password', createAdmin);
router.post('/login-email', loginEmail);
router.post('/login-password', loginPassword);

module.exports = router;