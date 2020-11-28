const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');
const multerS3 = require('multer-s3');
const multer = require('multer');

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

function checkFileType( file, cb ){
    if(file.mimetype === 'application/pdf' || 
        file.mimetype === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
        cb(null, true);
    }
    else {
        cb(null, false);
        return cb(new Error('Only pdf or docx format allowed!'));
    }
}

router.post( '/', ( req, res ) => { resumeUpload( req, res, ( error ) => {
    console.log( 'requestOkokok', req.file );
    if(error) {
        // console.log( 'errors', error.message );
        res.json( { error: error.message } );
    } else {
        // If File not found
        if( req.file === undefined ){
            console.log( 'Error: No File Selected!' );
            res.json( 'Error: No File Selected' );
        } else {
            // If Success
            const resumeName = req.file.key;
            const resumeLocation = req.file.location;   
            // Save the file name into database into profile model 
            res.json({
                resume: resumeName,
                location: resumeLocation
            });
            }
        }
    });
})









































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