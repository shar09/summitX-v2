import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/auth';

const SignIn = ({ signInModalState, setSignInModalState, signIn, errors }) => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    
    const { email, password } = formData;

    const handleChange = (e) => {
        const { name, value } = e.target;

        setFormData({
            ...formData,
            [name]: value
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        signIn(email, password);
    }

    return (
        signInModalState ? (
        <div className="modal-bg">
            <form className="modal sign-in" autoComplete="on" onSubmit={handleSubmit}>
                <div className="close" onClick={() => setSignInModalState(false)}>
                    <i className="fas fa-times close-icon" />
                </div>
                <h1>Sign In</h1>
                <section className="form-control">
                    <label htmlFor="text">Email</label>
                    <input type="text" 
                        autoFocus
                        autoComplete="email"
                        required
                        name="email"
                        onChange={handleChange}
                    />
                    {   errors.map(error => (
                        // console.log(error.param);
                        error.param === "email" ? 
                        (<small className="form-error">
                            {error.msg}
                        </small>
                        ): <Fragment />   
                        ))
                    } 
                </section>
                <section className="form-control">
                    <label htmlFor="password">Password</label>
                    <input type="password" 
                        autoComplete="password"
                        required
                        name="password"
                        onChange={handleChange}
                    />
                    {   errors.map(error => (
                        // console.log(error.param);
                        error.param === "password" ? 
                        (<small className="form-error">
                            {error.msg}
                        </small>
                        ): <Fragment />   
                        ))
                    } 
                    <small>Forgot password?</small>
                </section>
                <button type="submit" className="btn-primary">Sign In</button>
                <small>Don't have an account? <span class="sign-in-link">Sign Up</span></small>
            </form>
        </div>
        ) : <Fragment />
    )
}

SignIn.propTypes = {
    signIn: PropTypes.func.isRequired,
    errors: PropTypes.array.isRequired
}

const mapStateToProps = state => ({
    errors: state.errors
});

export default connect(mapStateToProps, { signIn })(SignIn);