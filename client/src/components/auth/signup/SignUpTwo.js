import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import signupimg from '../../../images/signup-imgs.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createProfile } from '../../../actions/profile';
import Spinner from '../../layout/Spinner';

const SignUpTwo = ({ createProfile, auth: { isAuthenticated, loading, userLoaded, user } }) => {
    useEffect( () => {
        console.log("useffect kicked in yo")
    }, [user.isProfile]);

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
    
    if (loading) {
        return <Spinner />
    }
    else {
        if(userLoaded) {
            if(isAuthenticated && user.isProfile && !user.isResume) {
                return <Redirect to="/signup-three" />
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
                    <label htmlFor="city">City</label>
                    <input type="text" placeholder="Austin, New York, etc" 
                        id="city" 
                        name="city" 
                        value={city}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="state">State</label>
                    <select name="state" id="state" value={state} onChange={handleChange} required >
                        <option value="AL">Alabama (AL)</option>
                        <option value="AK">Alaska (AK)</option>
                        <option value="AZ">Arizona (AZ)</option>
                        <option value="AR">Arkansas (AR)</option>
                        <option value="CA">California (CA)</option>
                        <option value="CO">Colorado (C0)</option>
                        <option value="CT">Connecticut (CT)</option>
                        <option value="DE">Delaware (DE)</option>
                        <option value="DC">District of Columbia (DC)</option>
                        <option value="FL">Florida (FL)</option>
                        <option value="GA">Georgia (GA)</option>
                        <option value="HI">Hawaii (HI)</option>
                        <option value="ID">Idaho (ID)</option>
                        <option value="IL">Illinois (IL)</option>
                        <option value="IN">Indiana (IN)</option>
                        <option value="IA">Iowa (IA)</option>
                        <option value="KS">Kansas (KS)</option>
                        <option value="KY">Kentucky (KY)</option>
                        <option value="LA">Louisiana (KA)</option>
                        <option value="ME">Maine (ME)</option>
                        <option value="MD">Maryland (MD)</option>
                        <option value="MA">Massachusetts (MA)</option>
                        <option value="MI">Michigan (MI)</option>
                        <option value="MN">Minnesota (MN)</option>
                        <option value="MS">Mississippi (MS)</option>
                        <option value="MO">Missouri (MO)</option>
                        <option value="MT">Montana (MT)</option>
                        <option value="NE">Nebraska (NE)</option>
                        <option value="NV">Nevada (NV)</option>
                        <option value="NH">New Hampshire (NH)</option>
                        <option value="NJ">New Jersey (NJ)</option>
                        <option value="NM">New Mexico (NM)</option>
                        <option value="NY">New York (NY)</option>
                        <option value="NC">North Carolina (NC)</option>
                        <option value="ND">North Dakota (ND)</option>
                        <option value="OH">Ohio (OH)</option>
                        <option value="OK">Oklahoma (OK)</option>
                        <option value="OR">Oregon (OR)</option>
                        <option value="PA">Pennsylvania (PA)</option>
                        <option value="RI">Rhode Island (RI)</option>
                        <option value="SC">South Carolina (SC)</option>
                        <option value="SD">South Dakota (SD)</option>
                        <option value="TN">Tennessee (TN)</option>
                        <option value="TX">Texas (TX)</option>
                        <option value="UT">Utah (UT)</option>
                        <option value="VT">Vermont (VT)</option>
                        <option value="VA">Virginia (VA)</option>
                        <option value="WA">Washington (WA)</option>
                        <option value="WV">West Virginia (WV)</option>
                        <option value="WI">Wisconsin (WI)</option>
                        <option value="WY">Wyoming (WY)</option>
                    </select>
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
    createProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
}); 

export default connect(mapStateToProps, { createProfile })(SignUpTwo);