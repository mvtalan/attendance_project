const express = require('express');
const router = express.Router();
const studentController = require('../controllers/studentController');

//home route
router.get('/home', studentController.getHome);





module.exports = router;