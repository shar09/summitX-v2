import React, { useEffect } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';

// Images
import image1 from '../../images/img-1.jpeg';
import image3 from '../../images/img-3.jpg';
import image4 from '../../images/img-4.jpg';

const Landing = ({ getProfile, auth: { isAuthenticated },  profile: { profile } }) => { 

    useEffect( () => {
        getProfile();
        console.log("landing");
    }, []);

    if(isAuthenticated && !profile) {
        return <Redirect to="/signup-two" />
    }

    if(isAuthenticated && profile && !profile.resume) {
        return <Redirect to="/signup-three" />
    }

    if(isAuthenticated && profile && profile.resume) {
        return <Redirect to="/dashboard" />
    }

    return (
        <div className="landing">
            <div className="home-grid">
                <div className="content">
                    <h3 className="content-heading">Who we are</h3>
                    <p> We are a salesforce staffing company based in Austin, TX. Our goal is to create a seamless hiring process for
                        companies looking to fill their next salesforce position with quality talent. We specialize in salesforce 
                        consulting and our candidates are highly skilled and experienced salesforce developers. With years of experience 
                        in the salesforce industry we understand what it takes to build a successful project with salesforce and can help 
                        you find the right candidate based off your requirements.
                    </p>
                </div>
                <img src={image1} />
            </div>
            <div className="home-grid">
                <div className="content">
                    <h3 className="content-heading">Find your next job</h3>
                    <p>
                        Are you looking for a job in salesforce development or are you looking to get started with salesforce?
                        You are in the right place. Sign Up and let us know more about you and we'll get in touch with you. We 
                        value your time and every candidate that is enrolled in summitX will hear back from us.
                    </p>
                    <Link to="signup-one" className="btn-primary content-button">Sign Up</Link>
                </div>
                <img src={image4} />
            </div>
            <div className="home-grid">
                <div className="content">
                    <h3 className="content-heading">Hire Talent</h3>
                    <p>
                        Looking for the right candidate , or do you require
                        consulting services in salesforce for your project? We are here to help. Contact Us and we will get in
                        touch with you.
                    </p>
                    <a href="#" className="btn-primary content-button">Contact Us</a>
                </div>
                <img src={image3} />
            </div>
        </div>    
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired,
    profile: PropTypes.object.isRequired,
    getProfile: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile } )(Landing);