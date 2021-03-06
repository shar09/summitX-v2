import React, { useState, Fragment } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Spinner from './Spinner';

// Images
import image1 from '../../images/img-1s.jpg';
import image3 from '../../images/img-3s.jpg';
import image4 from '../../images/img-4s.jpg';

const Landing = ({ auth: { isAuthenticated, loading, userLoaded, user } }) => { 

    const [ dialog, closeDialog ] = useState(true);

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
        <div className="landing">
            { dialog ? (
                <div className="dialog">
                    <small className="dialog-text">This website is still in development phase and we will not be reviewing any profiles yet. If you have any queries, 
                        please reach out to <span className="my-email">'sunmarsearth@gmail.com'</span>
                        <span className="dialog-close"
                            onClick={ () => closeDialog(false) }
                        >
                            [<i className="fas fa-times"></i>]
                        </span>
                    </small>
                </div>
                ) : <Fragment />
            }
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
                <img alt="fancy" src={image1} />
            </div>
            <div className="home-grid">
                <div className="content">
                    <h3 className="content-heading">Find your next job</h3>
                    <p>
                        Are you looking for a job in salesforce development or are you looking to get started with salesforce?
                        You are in the right place. Sign Up and let us know more about you and we'll get in touch with you. We 
                        value your time and every candidate that is enrolled in summitX will hear back from us.
                    </p>
                    <Link to="/signup-one" className="btn-primary content-button">Sign Up</Link>
                </div>
                <img alt="fancy" src={image4} />
            </div>
            <div className="home-grid">
                <div className="content">
                    <h3 className="content-heading">Hire Talent</h3>
                    <p>
                        Looking for the right candidate , or do you require
                        consulting services in salesforce for your project? We are here to help. Contact Us and we will get in
                        touch with you.
                    </p>
                    <Link to="/contact" className="btn-primary content-button">Contact Us</Link>
                </div>
                <img alt="fancy" src={image3} />
            </div>
        </div>    
    )
}

Landing.propTypes = {
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(Landing);