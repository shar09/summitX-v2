import React, { useState, useEffect } from 'react';
import signupimg from '../../../images/signup-img.jpg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile, uploadResume } from '../../../actions/profile';

const SignUpThree = ({ getProfile, uploadResume, 
        auth: { isAuthenticated },  
        profile: { profile }
    }) => {
        
    useEffect( () => {
        console.log("3");
        getProfile();
    }, []);

    const [resume, uploadFile] = useState(null);

    const handleChange = e => {
        uploadFile(e.target.files[0]);
    }

    const handleSubmit = async e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('resume', resume);

        uploadResume(formData);
    }

    if(isAuthenticated && !profile) {
        return <Redirect to="/signup-two" />
    }

    if(isAuthenticated && profile && profile.resume) {
        return <Redirect to="/dashboard" />
    }

    return (
        <section className="landing-forms">
            <div className="side-image">
                <img src={signupimg} />
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h1 className="">Let's create your profile</h1>
                <div className="form-group">
                    <label className="upload-resume" htmlFor="myfile">Upload Resume (PDF)</label>
                    <input type="file" id="myfile" 
                        name="myFile"
                        onChange={handleChange}
                        required 
                    />
                </div>
                <button type="submit" className="btn-primary">Register</button>  
            </form>
        </section>
    )
}

SignUpThree.propTypes = {
    getProfile: PropTypes.func.isRequired,
    uploadResume: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile, uploadResume })(SignUpThree);