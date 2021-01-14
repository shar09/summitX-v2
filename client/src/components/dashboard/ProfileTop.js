import React, { Fragment, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { updateProfile } from '../../actions/profile';

const ProfileTop = ({ profile, updateProfile }) => {
    const [editMode, setEditMode] = useState(false);

    const capitalizeFirst = word => {
        return word[0].toUpperCase() + word.slice(1).toLowerCase();
    }

    const transformWord = word => {
        let transformedWord = "";
        const wordArray = word.split(' ');
        for(let item of wordArray) {
            transformedWord = transformedWord + capitalizeFirst(item) + " ";
        }
        return transformedWord;
    }

    const initialState = {
        // firstname: capitalizeFirst(profile.user.firstname),
        // lastname: capitalizeFirst(profile.user.lastname),
        position: transformWord(profile.position),
        summary: profile.summary,
        city: capitalizeFirst(profile.city),
        state: profile.state.toUpperCase(),
        linkedin: profile.linkedin
    }

    const [formData, setFormData] = useState(initialState);

    const { position, summary, city, state, linkedin } = formData;

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const setInitialState = () => {
        setFormData({
            ...initialState
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        setEditMode(false); 
        // editName(firstname, lastname);
        updateProfile({ position, summary, city, state, linkedin}); 
    }

    return (
        <Fragment>
            { !editMode ? (
            <div className="profile-about border-bottom">
                <div className="letter-avatar">
                    <p>{profile.user.firstname[0].toUpperCase()}{profile.user.lastname[0].toUpperCase()}</p>
                </div>
                <div className="about-content">
                    <p className="profile-name">{capitalizeFirst(profile.user.firstname)} {capitalizeFirst(profile.user.lastname)} </p>
                    <p className="profile-position">{transformWord(profile.position)} <span className="profile-icons">
                        <i className="fas fa-map-marker-alt"></i> <span className="icon-text"> {capitalizeFirst(profile.city)}, {profile.state.toUpperCase()}</span>
                        
                        { linkedin ? ( <a href={linkedin} rel="noreferrer" target="_blank">
                            <i className="fab fa-linkedin-in" />
                        </a> ) : <Fragment /> }
                        </span>
                    </p>
                    <p className="profile-summary">
                        { profile.summary }
                    </p>
                </div>
                <div className="edit-profile" onClick={ () => setEditMode(true)}>
                    <i className="far fa-edit"></i>
                    <span className="icon-text"> Edit</span>
                </div>
            </div>
            ):(
            <div className="fadeIn add-experience card">
                <p className="experience-header">
                    <span className="company-name">{capitalizeFirst(profile.user.firstname)} {capitalizeFirst(profile.user.lastname)} / Edit Profile</span>
                    <span className="edit-experience">
                        <button className="add-exp-button" 
                            type="submit"
                            form="profile-top"
                        >
                            Save
                        </button>
                        <span className="exp-cancel" onClick={ () => { setEditMode(false);  setInitialState(); }}>Cancel</span>
                    </span>
                </p>
                <form id="profile-top" className={` ${editMode ? 'exp-form': ''}`} onSubmit={handleSubmit}>
                    {/* <div className="form-group">
                        <label htmlFor="first-name">First Name</label>
                        <input type="text" id="first-name" placeholder="First Name" 
                            name="firstname" 
                            value={firstname}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="last-name">Last Name</label>
                        <input type="text" id="last-name" placeholder="Last Name" 
                            name="lastname" 
                            value={lastname}
                            onChange={handleChange}
                            required 
                        /> 
                    </div> */}
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
                            cols="30" rows="6" 
                            name="summary" 
                            value={summary}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="location">City</label>
                        <input type="text" id="city" placeholder="Austin, New York, etc"
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
                        <input type="text" id="linkedin" 
                            name="linkedin" 
                            value={linkedin}
                            onChange={handleChange}
                            required 
                        />
                    </div>
                </form> 
            </div>
        )}
       </Fragment>
    )
}

ProfileTop.propTypes = {
    updateProfile: PropTypes.func.isRequired
}

export default connect(null, { updateProfile })(ProfileTop);

