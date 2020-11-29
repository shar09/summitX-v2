const express = require('express');
const router = express.Router();
const { check, validationResult, checkSchema } = require('express-validator');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

const s3 = new aws.S3({
    accessKeyId: 'AKIATFPOQARMTCE7FGXU',
    secretAccessKey: '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',
    Bucket: 'summitxbucket'
});

const resumeUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: 'summitxbucket',
     acl: 'public-read',
     key: function (req, file, cb) {
        cb(null, new Date().toISOString() + file.originalname);
     }
    }),
    limits:{ fileSize: 2000000 }, // In bytes: 2000000 bytes = 2 MB
    fileFilter: function( req, file, cb ){
     checkFileType( file, cb );
    }
}).single('resume');

function checkFileType( file, cb ) {
    if(file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error('Only pdf or docx format allowed!'));
    }
}


router.post("/", auth, [
    check('position', 'position is required').not().isEmpty(),
    check('state', 'state is required').not().isEmpty(),
    check('city', 'city is required').not().isEmpty(),
    check('summary', 'summary is required').not().isEmpty(),
], async (req, res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { position, state, city, summary, linkedin } = req.body;

    const profileFields = {
        user: req.user.id,
        position,
        state,
        city,
        summary,
        linkedin
    }

    try {
        let profile = await Profile.findOne({ user: req.user.id });
        if(profile) {
            profile = await profile.findOneandUpdate(
                { user: req.user.id },
                { $set: profileFields },
                { new: true }
            )
            return res.json(profile);
        }
        
        profile = new Profile(profileFields);
        await profile.save();
        res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');   
    }
})



router.post('/resume', auth, ( req, res ) => { resumeUpload( req, res, async ( error ) => {
    try {
        if(error) {
            res.status(400).json({ errors: [{ msg: error.message }] });
        } else {
            // If File not found
            if( req.file === undefined ){
                res.status(400).json({ errors: [{ msg: "No File Selected" }] });
            } else {
                // If Success
                console.log( 'requestOkokok', req.file );
                const resumeName = req.file.key;
                const resumeLocation = req.file.location;   
                const resume = {
                    resumeName,
                    resumeLocation
                }
                // Save the file name into database into profile model 
                const profile = await Profile.findOne({ user: req.user.id });

                if(!profile) {
                    return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
                }
                
                profile.resume = resume;

                await profile.save();

                return res.json(profile);
            }
        }   
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});
});     








// router.post( '/', 
//     resumeUpload,
//     check('position', 'position is required').not().isEmpty(),
//     check('state', 'state is required').not().isEmpty(),
//     check('city', 'city is required').not().isEmpty(),
//     check('summary', 'summary is required').not().isEmpty(),
//     checkSchema({
//         'resume': {
//             custom: {
//                 options: (value, {req}) => {
//                     // return !!req.file
//                     if(req.file.mimetype !== 'application/pdf' || 
//                         req.file.mimetype !== 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
//                            console.log(req.file) 
//                            return false 
//                     }
//                 },
//                 errorMessage: 'You should upload a PDF file up to 10Mb',
//             },
//         } 
//     }),
//     async (req, res) => { 
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const {firstname, lastname, email, password, position, summary, city, state} = req.body;
//     // resumeUpload(req, res, (err) => {
//     //     if (err) {
//     //         return res.status(400).json({ errors: [{ msg: err.message }] });
//     //     }
//     //     if(req.file === undefined) {
//     //         return res.status(400).json({ errors: [{ msg: "No file selected" }] });
//     //     }
//         try {
//             // If Success
//             const resumeName = req.file.key;
//             const resumeLocation = req.file.location;   
//             // Save the file name into database into profile model 
//             res.json({
//                 resume: resumeName,
//                 location: resumeLocation
//             });
//         } catch (err) {
//             res.status(500).send('Server Error');
//         }
    
//     // });
// });





















// router.post( '/', 
//     resumeUpload,
//     check('position', 'position is required').not().isEmpty(),
//     check('state', 'state is required').not().isEmpty(),
//     check('city', 'city is required').not().isEmpty(),
//     check('summary', 'summary is required').not().isEmpty(),
//     async (req, res) => { 
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }
//     const {firstname, lastname, email, password, position, summary, city, state} = req.body;
//     resumeUpload(req, res, (err) => {
//         if (err) {
//             return res.status(400).json({ errors: [{ msg: err.message }] });
//         }
//         if(req.file === undefined) {
//             return res.status(400).json({ errors: [{ msg: "No file selected" }] });
//         }
//         try {
//             // If Success
//             const resumeName = req.file.key;
//             const resumeLocation = req.file.location;   
//             // Save the file name into database into profile model 
//             res.json({
//                 resume: resumeName,
//                 location: resumeLocation
//             });
//         } catch (err) {
//             res.status(500).send('Server Error');
//         }
    
//     });
// });













































// const storage = multer.diskStorage({
//     destination: function(req, file, cb) {
//         cb(null, './uploads');
//     },
//     filename: function(req, file, cb) {
//         cb(null, new Date().toISOString() + file.originalname);
//     }
// })

// const fileFilter = (req, file, cb) => {
//     if(file.mimetype === 'application/pdf') {
//         cb(null, true);
//     }
//     else {
//         cb(null, false);
//     }
// }

// const upload = multer({ 
//     storage, 
//     limits: {
//         fileSize: 1024 * 1024 * 5
//     },
//     fileFilter
// }).single('resume');

// // @route POST api/profile
// // @desc  Upload Resume
// // @access Private

// router.post('/', 
// [
//     check('position', 'position is required').not().isEmpty(),
//     check('state', 'state is required').not().isEmpty(),
//     check('city', 'city is required').not().isEmpty(),
//     check('summary', 'summary is required').not().isEmpty(), 
// ], 
// (req, res) => {
//     const errors = validationResult(req);
//     if(!errors.isEmpty()) {
//         return res.status(400).json({ errors: errors.array() });
//     }

//     upload(req, res, (err) => {
//         if(err) {
//             console.log(err);
//         }
//         else {
//             console.log(req.file)
//         }
//     })
//     const { position, summary, city, state, linkedin } = req.body;
//     try {
//         res.send('Profile route')
//         const profile = new Profile({
//             position,
//             summary,
//             city,
//             state,
//             linkedin
//         });
        
//         profile.save();
//     } catch (err) {
//         console.log(err.message);
//         res.status(500).send('Server Error');
//     }
// });

module.exports = router;