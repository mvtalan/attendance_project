const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const AttendanceManager = require('../models/attendanceManager.js');
require('dotenv').config();


exports.login = async (req, res) => {

    const {email, password } = req.body;

    try {

        const user = await AttendanceManager.findOne({ email });

        if(!user) {
            return res.status(401).send('Invalid username or password.');
        }

        //verify the password using bcrypt
        const result = await bcrypt.compare(password, user.password);

        if(!result) {
            return res.status(401).send('Invalid username or password.');
        }

        //generate the jwt
        const sign = jwt.sign({ id : user._id.toString() }, process.env.secret_key, {expiresIn: '5m'});

        //create a cookie and place JWT/token inside it
        res.cookie('jwt', token, {maxAge: 5 * 60 * 1000, http: true});

        res.redirect('/attendance');


    } catch (error) {
        res.status(500).send('Internal Server Error');
    }
}


exports.register = async(req,res) => {
    const {email, password, confirmPassword } = req.body;

    try {
        const existingUser = await AttendanceManager.findOne({ email });

        if(existingUser) {
            return res.status(400).send('Username already exist. Please try again.');
        }

        if(password !== confirmPassword) {
            return res.status(400).send('Passwords do not match. Please try again.');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new AttendanceManager ({
            email,
            password : hashedPassword
        });

        await newUser.save();

        res.redirect('/login');

    } catch(error) {

        res.status(500).send('Internal Server Error');

    }

}