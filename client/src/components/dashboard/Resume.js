import React, { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { updateResume } from '../../actions/profile';
import { resetErrors } from '../../actions/error';
import Spinner from '../layout/Spinner';

const Resume = ({ errors, resume, updateResume, resetErrors }) => {

    useEffect( () => {
        if(errors.length === 0) {
            setResumeLoading(false);
            setShowEditResume(false);
        }
        else {
            setResumeLoading(false);
            setShowEditResume(true);
        }
    }, [errors, resume] );

    const [file, uploadFile] = useState(null);

    const [ showEditResume, setShowEditResume ] = useState(false);

    const [resumeLoading, setResumeLoading] = useState(false);

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

        updateResume(formData);

        setResumeLoading(true);
    }

    return (
        <Fragment>
        { resumeLoading ? <Spinner /> : (
            <Fragment>
                <div className="experience-new">
                    <h3>Resume / CV</h3>
                    <p onClick={ () => setShowEditResume(true) }><i className="fas fa-plus"></i> Upload New </p>
                </div>

                { !showEditResume ? (
                    <div className="show-resume">
                        <span className="resume-name">{resume.name}</span>
                        <a href={resume.location} target="_blank" rel="noreferrer"
                            className="resume-link"
                        >
                            View your resume
                        </a>
                    </div>
                ) : (
                    <div className="fadeIn card">
                        <p className="experience-header">
                            <span className="company-name">Upload Resume (PDF)</span>
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
                        <form id="resume-upload" className="resume-form" 
                            onSubmit={ (e) => { handleSubmit(e) }}
                        >
                            <div className="form-group">
                                <label htmlFor="myfile">Upload your latest resume</label>
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
        )}
        </Fragment>
    );
} 

Resume.propTypes = {
    updateResume: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    resume: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    errors: state.errors,
    resume: state.profile.profile.resume
});

export default connect(mapStateToProps, { updateResume, resetErrors })(Resume);





