const express = require('express');

const router = express.Router();



const homeController = require('../controllers/home_controller');
const blackListController = require('../controllers/blackList_controller');
const adminController = require('../controllers/admin_controller');

const userController = require('../controllers/user_controller');

router.get('/', homeController.home);

<<<<<<< HEAD
router.get('/admin', adminController.admin);
=======
router.get('/signup',userController.signup);


>>>>>>> 504814bd6664d9f05dbfe8a8709ec72b648c80cc

router.use('/users', require('./users'));

router.post('/blacklist',blackListController.blackList);












console.log("router loaded");

module.exports = router;