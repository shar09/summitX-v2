const express = require('express');
const router = express.Router();
const multer = require('multer');
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');
const Profile = require('../../models/Profile');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
    }
})

const fileFilter = (req, file, cb) => {
    if(file.mimetype === 'application/pdf') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
}

const upload = multer( { 
    storage, 
    limits: {
        fileSize: 1024 * 1024 * 5
    },
    fileFilter
});


// @route GET api/profile
// @desc  TEST route
// @access Private

router.post('/', upload.single('resume'), (req, res) => {
    try {
        console.log(req.file);
        res.send('Profile route') 
    } catch (err) {
        console.log(err);
        res.status(500).json({
          error: err
        });
    }

});

module.exports = router;