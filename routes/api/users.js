const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../middleware/auth');
const User = require('../../models/User');

// @route  POST api/users
// @desc   Register User
// @access Public

router.post('/', 
[
    check('firstname', 'first name is required').not().isEmpty(),
    check('lastname', 'last name is required').not().isEmpty(),
    check('email','enter a valid email').isEmail(),
    check('password', 'password needs to be more than six characters').isLength( {min: 6} ),
],
async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname, email, password } = req.body;
    
    try {      
        // see if users exist
        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({ errors: [{ param: 'su-email', msg: "Email already exists" }] });
        }

        user = new User({
            firstname: firstname.trim(),
            lastname: lastname.trim(),
            email,
            password
        });

        // encrypt password
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //saves to database
        await user.save();      
        
        // return jsonwebtoken - to login right after registration, authorize routes
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
        res.status(500).send('Server Error');
    }    
});

// @route PUT api/users
// @desc Edit Name (Experimental)
// @acceess Private
router.put('/', auth, [
    check('firstname', 'first name is required').not().isEmpty(),
    check('lastname', 'last name is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { firstname, lastname } = req.body;

    try {
        let user = await User.findById(req.user.id);

        if(user) {
            user.firstname = firstname;
            user.lastname = lastname;
            await user.save();
            return res.json(user);
        }
        else {
            return res.status(400).json({ errors: [{ msg: "User not found "} ] });
        }

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
