import React, { Fragment, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { resetErrors, setError } from '../../actions/error';
import { resetPassword } from '../../actions/auth';

const ResetPassword = ({ resetPassword, resetErrors, setError, errors, auth: { msg } }) => {
    const [ formData, setFormData ] = useState({
        password: '',
        confirmPassword: ''
    });

    const { token } = useParams();

    const { password, confirmPassword } = formData;

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
            setError("Passwords do not match", "rs-password");
        }
        else {
            resetPassword( password, token );
        }
    }

    return (
        <Fragment>
            { msg[0] && msg[0].param === 'rs-msg' ? (
                <div class="reset-password">
                    <p> {msg[0].msg}</p>
                    <Link className="btn-primary return-home" to="/">
                        Return Home
                    </Link>
                </div>
            ) : (
                <div className="reset-password ">
                    <h2 className="">Save your new password</h2>
                    <form className="sign-up-form" onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label htmlFor="password">New Password</label>
                            <input type="password" id="new-password" 
                                name="password" 
                                value={password}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="confirm-password">Confirm New Password</label>
                            <input type="password" id="confirm-password" 
                                name="confirmPassword" 
                                value={confirmPassword}
                                onChange={handleChange}
                                required 
                            />
                        </div>
                        { errors.map( (error, index) => (
                            error.param === 'rs-password' ?  (
                                    <small className="form-error" key={index}> {error.msg} </small> 
                                ) : <Fragment />
                            )) 
                        }
                        { errors.map( (error, index) => (
                            error.param === 'token' ?  (
                                    <small className="form-error" key={index}> {error.msg} </small> 
                                ) : <Fragment />
                            )) 
                        }
                        <button type="submit" class="btn-primary">Reset</button>  
                    </form>
                </div>
            )}    
        </Fragment>
    );
}

ResetPassword.propTypes = {
    resetErrors: PropTypes.func.isRequired,
    setError: PropTypes.func.isRequired,
    resetPassword: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.errors
});

export default connect(mapStateToProps, { resetPassword, resetErrors, setError })(ResetPassword);