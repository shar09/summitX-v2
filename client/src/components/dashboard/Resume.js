import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadResume } from '../../actions/profile';
import { resetErrors } from '../../actions/error';

const Resume = ({errors, resume, uploadResume, resetErrors }) => {

    useEffect( () => {
        if(errors.length === 0) {
            setShowEditResume(false);
        }
        else 
            setShowEditResume(true);
    }, [errors] );

    const [file, uploadFile] = useState(null);

    const [ showEditResume, setShowEditResume ] = useState(false);

    const handleChange = e => {
        uploadFile(e.target.files[0]);
    }

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('resume', file);

        if(errors.length > 0) {
            resetErrors();
        }

        uploadResume(formData);
    }

    return (
        <Fragment>
            <div className="experience-new">
                <h3>Resume / CV</h3>
                <p onClick={ () => setShowEditResume(true) }><i className="fas fa-plus"></i> Upload New </p>
            </div>

            { !showEditResume ? (
                <div className="show-resume">
                    <span className="resume-name">{resume.name}</span>
                    <a href={resume.location} target="_blank"
                        className="resume-link"
                    >
                        View your resume
                    </a>
                </div>
            ) : (
                <div className="card">
                    <p className="experience-header">
                        <span className="company-name">Upload your newest resume</span>
                        <span className="">
                            <button className="add-exp-button" type="submit" 
                                form="resume-upload"
                            >
                                Save
                            </button>
                            <span className="exp-cancel"
                                onClick = { () => { uploadFile(null); 
                                    setShowEditResume(false); 
                                    resetErrors();
                                }}
                            >
                                Cancel
                            </span>
                        </span>
                    </p>
                    <form id="resume-upload" className="resume-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="myfile">Upload Resume (PDF)</label>
                            <input type="file" 
                                id="myfile" 
                                name="myfile" 
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        { errors.length > 0 ? ( errors.map( (error, index) => (
                                error.param === "resume" ? 
                                ( <small key={index} className="form-error">
                                    {error.msg}
                                </small>
                                ) : <Fragment />   
                            )) ) : <Fragment />
                        } 
                    </form>
                </div>
            )}
        </Fragment>
    );
} 

Resume.propTypes = {
    uploadResume: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    resume: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    resume: state.profile.profile.resume
});

// const mapDispatchToProps = dispatch => ({
//     resetErrors: () => dispatch(resetErrors())
// });

export default connect(mapStateToProps, { uploadResume, resetErrors })(Resume);

// ------ On Hold ------ //
// import api from '../../utils/api';

// const [ resumeLink, setResumeLink ] = useState('');

// const getResume = async () => {
//     try {
//         const res = await api.get('/profile/resume');
//         return res.data.url;

//     } catch (err) {
//         console.log(err.message);
//     }
// }

// const handleClick = () => {
//      ( async function() {
//         const url = await getResume();
//         console.log(url);
//         setResumeLink(url);
//     })();
// }


// ------ Calling setState in handle click ------ // Does not work as expected

// ( function upload(cb) {
//     uploadResume(formData);

//     if(errors.length === 0) {
//         cb(false);
//     }
    
// (setShowEditResume);

// uploadResume(formData).then(() => {
//     if(errors.length === 0) {
//     //     console.log("enetr")
//         setShowEditResume(false);
//     }
// }).catch(() => {
//     console.log("hello");
// })


