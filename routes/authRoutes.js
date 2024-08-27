const express = require('express');
const authController = require('../controllers/authController');
const router = express.Router();


router.get('/login', (req,res) => {res.render('login');})
router.get('/register', (req,res) => {res.render('register');})
// router.get('/attendance', (req,res) => {res.render('attendance');})

router.post('/register', authController.register);


module.exports = router;