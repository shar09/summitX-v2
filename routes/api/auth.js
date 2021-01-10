const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../../middleware/auth');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport');
const crypto = require('crypto');

var options = {
    auth: {
        api_key: `${process.env.sendgridapi}`
    }
}

var mailer = nodemailer.createTransport(sgTransport(options));

// @route  GET api/auth
// @desc   to load user on register/login
// @access Private

router.get('/', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user);
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/auth
// @desc   Login User
// @access Public

router.post('/', [
    check('email','Enter a valid email').isEmail(),
    check('password', 'Password is required').exists(),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const {email, password} = req.body;
    
    try {      
        // see if users exist
        let user = await User.findOne({ email });
        if(!user) {
            return res.status(400).json({ errors: [{ msg: "Email not found", param: "email" }] });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        
        if(!isMatch) {
            return res.status(400).json({ errors: [{ msg: "Invalid Password", param: "password" }] });
        }

        // return jsonwebtoken - authorize routes
        const payload = {
            user: {
                id: user.id
            }
        }
        
        jwt.sign(
            payload, 
            `${process.env.jwtSecret}`,
            { expiresIn: 360000 },
            (err, token) => {
               if(err) throw err;
               res.json({ token });
            } 
        );
    }
    catch(err) {
        console.log(err.message);
        res.status(500).send('Server Error')
    }    
});

// @route  POST api/auth
// @desc   Login User
// @access Public

router.post('/password', check('email','Enter a valid email').isEmail(), (req, res) => {  
    crypto.randomBytes(256, async (err, buffer) => {

        try {
            if (err) {
                console.log(err);
            }
    
            const token = buffer.toString('hex');
    
            const user = await User.findOne({ email: req.body.email });
    
            if(!user) {
                return res.status(400).json({ errors: [{ msg: "Email not found", param: "fp-email" }] });
            }
    
            user.resetToken = token;
            user.expireToken = Date.now() + 3600000;
            await user.save();
            
            var email = {
                to: 'pratyushatelu@gmail.com',
                from: 'sharathtelu9@gmail.com',
                subject: 'Hi there',
                text: 'Awesome sauce',
                html: '<b>Awesome sauce</b>'
            };
             
            mailer.sendMail(email, function(err, res) {
                if (err) { 
                    console.log(err) 
                }
                console.log(res);
            });
    
            return res.json({ msg: "Check your email for reset-password link." });
        } catch (err) {
            console.log(err.message);
            res.status(500).send('Server Error');
        }
    });
});

module.exports = router;