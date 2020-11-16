import React, { Fragment, useState } from 'react';

const SignUp = ({ signUpModalState, setSignUpModalState })  => {
    return (
        signUpModalState ? (
        <div className="modal-bg">
            <form className="modal sign-up" autoComplete="on">
                <i className="fas fa-times close" 
                    onClick={() => setSignUpModalState(false)}
                />
                <h1>Sign Up</h1>
                <section className="form-control">
                    <label for="text">Email</label>
                    <input type="text" 
                        autoFocus
                        autoComplete="email"
                    />
                </section>
                <section className="form-control">
                    <label for="password">Password</label>
                    <input type="password"></input>
                </section>
                <section className="form-control">
                    <label for="password">Confirm Password</label>
                    <input type="password"></input>
                </section>
                <button type="submit" className="btn-primary">Sign Up</button>
                <small>Already have an account? <span class="sign-in-link">Sign In</span></small>
            </form>
        </div>
        ) : <Fragment />
    )
}

export default SignUp;