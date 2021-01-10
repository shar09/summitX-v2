import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import image from '../../images/forgot-password.jpg';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';
import { forgotPassword } from '../../actions/auth';

const ForgotPassword = ({ auth: { isAuthenticated, loading, userLoaded, user, msg }, errors, forgotPassword  }) => {

    const [ email, setEmail ] = useState('');

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

    const handlChange = e => {
        setEmail(e.target.value);
    }

    const handleSubmit = e => {
        e.preventDefault();

        forgotPassword({ email });
    }

    return (
        <section className="landing-forms">
            <div className="side-image">
                <img src={image} />
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h1 className="">Forgot your password?</h1>
                <p>No problem, we got you covered. Enter your registered email and you will receive a reset password link.</p>
                <div className="form-group">
                    <label for="location">Email</label>
                    <input type="email" id="email" 
                        name="email"
                        value={email}
                        onChange={handlChange} 
                        required 
                    />
                </div>
                {   errors.map( (error, index) => (
                        error.param === "fp-email" ? 
                        (<small key={index} className="form-error">
                            {error.msg}
                        </small>
                        ): <Fragment />   
                    ))
                } 
                { msg === '' ? (
                    <button type="submit" className="btn-primary">Send Link</button>  
                ) : ( 
                    <p> {msg.msg}</p>
                )
                }
            </form>
        </section>
    )
}

ForgotPassword.propTypes = {
    auth: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired,
    forgotPassword: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { forgotPassword })(ForgotPassword);