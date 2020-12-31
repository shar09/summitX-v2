import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import signupimg from '../../../images/signup-img.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../../actions/profile';
import { getProfile } from '../../../actions/profile';

const SignUpTwo = ({ createProfile, getProfile, auth: { isAuthenticated }, profile: { profile } }) => {
    const [formData, setFormData] = useState({
        position: '',
        summary: '',
        city: '',
        state: '',
        linkedin: ''
    });

    const { position, summary, city, state, linkedin } = formData;

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();

        createProfile(formData); 

    }
    
    return (
        <section className="landing-forms">
            <div className="side-image">
                <img src={signupimg} />
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h1 className="">Let's create your profile</h1>
                <div className="form-group">
                    <label htmlFor="current-position">Current Position</label>
                    <input type="text" id="current-position" 
                        placeholder="Developer, Analyst, etc" 
                        name="position"
                        value={position}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Summary</label>
                    <textarea id="summary" placeholder="A few words about you, you current projects or skills..."  
                        cols="30"
                        rows="6"
                        name="summary"
                        value={summary}
                        onChange={handleChange} 
                        required
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">City</label>
                    <input type="text" placeholder="Austin, New York, etc" 
                        id="city" 
                        name="city" 
                        value={city}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="location">State</label>
                    <input type="text" placeholder="TX, NY, OR, etc"
                        id="state" 
                        name="state" 
                        value={state}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="linkedin">LinkedIn</label>
                    <input type="text" 
                        id="linkedin" 
                        name="linkedin" 
                        value={linkedin}
                        onChange={handleChange} 
                    />
                </div>
                <button type="submit" className="btn-primary">Next</button>  
            </form>
        </section>
    )
}

SignUpTwo.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    createProfile: PropTypes.func.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}); 

export default connect(mapStateToProps, { createProfile, getProfile })(SignUpTwo);