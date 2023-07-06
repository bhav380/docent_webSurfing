const express = require('express');

const router = express.Router();

const passport = require('passport');
const SessionChallengeStore = require('passport-fido2-webauthn').SessionChallengeStore;
const store = new SessionChallengeStore();
const base64url = require('base64url');




const homeController = require('../controllers/home_controller');

const blackListController = require('../controllers/blackList_controller');
const adminController = require('../controllers/admin_controller');
<<<<<<< HEAD
const blogController =require("../controllers/blog_controller");
=======
=======

>>>>>>> 90f72cc4ae784cbcb7e74a5830004be45b1d7258

const userController = require('../controllers/user_controller');
const blackListController = require('../controllers/blackList_controller');




router.get('/admin', adminController.admin);
router.get('/signup',userController.signup);
<<<<<<< HEAD
router.get('/blog',userController.blog);
=======
=======
>>>>>>> 90f72cc4ae784cbcb7e74a5830004be45b1d7258




router.get('/', homeController.home);
router.get('/signup',userController.signup);
router.use('/users', require('./users'));













router.use('/report',require('./report'));


router.use('/api',require('./api'));









console.log("router loaded");

module.exports = router;