import React, { Fragment, useState } from 'react';
import { Redirect } from 'react-router-dom';
import signupimg from '../../../images/signup-imgs.jpg';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { createAccount } from '../../../actions/auth';
import { setError, resetErrors } from '../../../actions/error';
import Spinner from '../../layout/Spinner';

const SignUpOne = ({ setSignInModalState, createAccount, setError, resetErrors, 
        errors,
        auth: { isAuthenticated, loading, userLoaded, user }
    }) => {

    const [formData, setFormData] = useState({
        firstname: '',
        lastname: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const { firstname, lastname, email, password, confirmPassword } = formData;

    const handleChange = e => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    }

    const handleSubmit = e => {
        e.preventDefault();
        if(password !== confirmPassword) {
            resetErrors();
            setError("Passwords do not match", "su-password");
        }
        else {
            createAccount({ firstname, lastname, email, password });
        }
    }

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
                <img alt="fancy" src={signupimg} />
            </div>
            <form className="sign-up-form" onSubmit={handleSubmit}>
                <h1 className="">Let's create your account</h1>
                <small>
                    Already have an account? <span onClick={ () => setSignInModalState(true) } className="sign-in-link">
                        Sign In
                    </span>
                </small>
                <div className="form-group">
                    <label htmlFor="firstname">First Name</label>
                    <input type="text" 
                        id="firstname" 
                        placeholder="First Name" 
                        name="firstname"
                        value={firstname}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="lastname">Last Name</label>
                    <input type="text" 
                        id="lastname" 
                        placeholder="Last Name" 
                        name="lastname"
                        value={lastname}
                        onChange={handleChange} 
                        required 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="email" 
                        id="email" 
                        placeholder="johndoe@example.com" 
                        name="email" 
                        value={email}
                        onChange={handleChange}
                        required 
                    />
                </div>
                { errors.map( (error, index) => (
                    error.param === 'su-email' ?  (
                            <small className="form-error" key={index}> {error.msg} </small> 
                        ) : <Fragment />
                    )) 
                }
                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        id="password" 
                        placeholder="Password" 
                        name="password" 
                        value={password}
                        onChange={handleChange}
                        required 
                    />
                </div>
                { errors.map( (error, index) => (
                    error.param === 'su-password' ?  (
                            <small className="form-error" key={index}> {error.msg} </small> 
                        ) : <Fragment />
                    )) 
                }
                <div className="form-group">
                    <label htmlFor="confirm-password">Confirm Password</label>
                    <input type="password" 
                        id="confirm-password" 
                        placeholder="Confirm Password" 
                        name="confirmPassword" 
                        value={confirmPassword}
                        onChange={handleChange}
                        required 
                    />
                </div>
                { errors.map( (error, index) => (
                    error.param === 'su-password' ?  (
                            <small className="form-error" key={index}> {error.msg} </small> 
                        ) : <Fragment />
                    )) 
                }
                <button type="submit" className="btn-primary">Next</button> 
            </form>
        </section>
    )
}

SignUpOne.propTypes = {
    createAccount: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    resetErrors: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired,
    auth: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors,
    auth: state.auth
})

export default connect(mapStateToProps, { createAccount, setError, resetErrors })(SignUpOne);