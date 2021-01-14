import React, { Fragment, useState } from 'react';
import signupimg from '../../../images/signup-imgs.jpg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { uploadResume } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';

const SignUpThree = ({ uploadResume, 
        auth: { isAuthenticated, loading, userLoaded, user },  
        errors
    }) => {
        
    const [resume, uploadFile] = useState(null);

    const handleChange = e => {
        uploadFile(e.target.files[0]);
    }

    const handleSubmit = e => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('resume', resume);

        uploadResume(formData);
    }

    if (loading) {
        return <Spinner />
    }
    else {
        if(userLoaded) {
            if(isAuthenticated && !user.isProfile) {
                return <Redirect to="/signup-two" />
            }

            if(isAuthenticated && user.isProfile && user.isResume) {
                return <Redirect to="/dashboard" />
            }    
        }
    }

    return (
        <section className="landing-forms">
            <div className="side-image">
                <img alt="fancy" src={signupimg} />
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
                {   errors.map( (error, index) => (
                        error.param === "resume" ? 
                        (<small key={index} className="form-error">
                            {error.msg}
                        </small>
                        ): <Fragment />   
                    ))
                } 
                <button type="submit" className="btn-primary">Register</button>  
            </form>
        </section>
    );
}

SignUpThree.propTypes = {
    uploadResume: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { uploadResume })(SignUpThree);