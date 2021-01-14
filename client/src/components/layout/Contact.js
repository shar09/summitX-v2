import React from 'react';
import contactImg from '../../images/contacts.jpg';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

const Contact = ({ auth: { isAuthenticated, loading, userLoaded, user } }) => {

    if (loading) {
        return <Spinner />
    }
    else {
        if(userLoaded) {
            if(isAuthenticated && !user.isProfile) {
                return <Redirect to="/signup-two" />
            }

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
                <img alt="fancy" src={contactImg} />
            </div>
            <form className="sign-up-form">
                <h1 className="">Let us know your requirements</h1>
                <div className="form-group">
                    <label htmlFor="first-name">First Name</label>
                    <input type="text" id="first-name" placeholder="First Name" name="firstname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input type="text" id="last-name" placeholder="Last Name" name="lastname" required />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" id="email" placeholder="name@company.com" name="email" required />
                </div>
                <div className="form-group">
                    <label htmlFor="current-position">Title</label>
                    <input type="text" id="current-position" placeholder="CEO, Hiring Manager, etc" name="currentPosition" required />
                </div>
                <div className="form-group">
                    <label htmlFor="summary">Message</label>
                    <textarea id="summary" placeholder="Provide a brief description of your enquiry" 
                    name="summary" cols="30"
                    rows="5" required></textarea>
                </div>
                <button type="submit" className="btn-primary">Submit</button>  
            </form>
        </section>
    )
}

Contact.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Contact);