const express = require('express');
const router = express.Router();
const { check, validationResult, checkSchema } = require('express-validator');
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');
const auth = require('../../middleware/auth');
const Profile = require('../../models/Profile');

const s3 = new aws.S3({
    accessKeyId: `${process.env.awskeyid}`,
    secretAccessKey: `${process.env.awsaccesskey}`,
    Bucket: `${process.env.awsbucket}`
});

const resumeUpload = multer({
    storage: multerS3({
     s3: s3,
     bucket: `${process.env.awsbucket}`,
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

// @route  GET api/profile/me
// @desc   get current users profile
// @access private

router.get("/me", auth, async (req, res) => {  
    try {
        const profile = await Profile.findOne({ user : req.user.id }).populate(
          'user',
          ['firstname', 'lastname']
        ); 
        if(!profile) {
            return res.status(400).json({msg: 'Profile not found'});
        }
        
        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server error');
    }
    
    // res.send('Profile Route')
});

// @route  POST api/profile/
// @desc   create or update user's profile info
// @access private

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

// @route  POST api/profile/resume
// @desc   upload resume
// @access private

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

// @route  POST api/profile/skills
// @desc   add skills
// @access private

router.post('/skills', auth, check('text', 'Skill is required').not().isEmpty(), async (req, res) => {

    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }        

    try {
        const profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }
        
        const skill = { 
            text: req.body.text
        }
        profile.skills.push(skill);

        await profile.save();

        return res.json(profile);

    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile/skills/:id
// @desc   delete skills
// @access private

router.delete('/skills/:id', auth, async (req, res) => {
    try {
        const profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        profile.skills = profile.skills.filter(skill => {
            return skill.id !== req.params.id
        })
        
        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  POST api/profile/experience
// @desc   Add Experience
// @access private

router.post('/experience', auth, [
    check('company', 'Company is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('from', 'From date required').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { company, title, description, from, to } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        let experience = {
            company,
            title,
            description,
            from,
            to,
        }

        profile.experience.push(experience);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/experience/:id
// @desc   Update Experience
// @access private

router.put('/experience/:id', auth, [
    check('company', 'Company is required').not().isEmpty(),
    check('title', 'Title is required').not().isEmpty(),
    check('description', 'Description is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { company, title, description, from, to } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        let experience = {
            company,
            title,
            description,
            from,
            to
        }

        await Profile.findOneAndUpdate(
            { "user": req.user.id, "experience._id": req.params.id },
            { 
                "$set": {
                    "experience.$": experience
                }
            },
            function(err,doc) {
                // console.log(err);
            }
        );

        res.send("Profile Experience Updated");
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  DELETE api/profile/experience/:id
// @desc   delete experience
// @access private

router.delete('/experience/:id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        profile.experience = profile.experience.filter(exp => {
            return exp.id !== req.params.id
        })

        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  POST api/profile/education
// @desc   Add Education
// @access private

router.post('/education', auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
], async (req, res) => {
    
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, description, from, to } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        let education = {
            school,
            degree,
            fieldofstudy,
            description,
            from,
            to,
        }

        profile.education.push(education);

        await profile.save();

        res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});

// @route  PUT api/profile/experience/:id
// @desc   Update Experience
// @access private

router.put('/education/:id', auth, [
    check('school', 'School is required').not().isEmpty(),
    check('degree', 'Degree is required').not().isEmpty(),
    check('fieldofstudy', 'Field of Study is required').not().isEmpty(),
    check('from', 'From date is required').not().isEmpty()
], async (req, res) => {
 
    const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    const { school, degree, fieldofstudy, description, from, to } = req.body;

    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        let education = {
            school,
            degree,
            fieldofstudy,
            description,
            from,
            to
        }

        await Profile.findOneAndUpdate(
            { "user": req.user.id, "education._id": req.params.id },
            { 
                "$set": {
                    "education.$": education
                }
            },
            function(err,doc) {
                // console.log(err);
            }
        );

        res.send("Profile Education Updated");
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
});


// @route  DELETE api/profile/education/:id
// @desc   delete education
// @access private

router.delete('/education/:id', auth, async (req, res) => {
    try {
        let profile = await Profile.findOne({ user: req.user.id });

        if(!profile) {
            return res.status(400).json({ errors: [{ msg: "Profile not found "} ] });
        }

        profile.education = profile.education.filter(edu => {
            return edu.id !== req.params.id
        });

        await profile.save();

        return res.json(profile);
    } catch (err) {
        console.log(err.message);
        res.status(500).send('Server Error');
    }
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