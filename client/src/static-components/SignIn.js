import React, { Fragment } from 'react';

const SignIn = ({ signInModalState, setSignInModalState }) =>  {
    return (
        signInModalState ? (
        <div className="modal-bg">
            <form className="modal sign-in" autoComplete="on">
                <i className="fas fa-times close" 
                    onClick={() => setSignInModalState(false)}
                />
                <h1>Sign In</h1>
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
                    <small>Forgort password?</small>
                </section>
                <button type="submit" className="btn-primary">Sign In</button>
                <small>Don't have an account? <span class="sign-in-link">Sign Up</span></small>
            </form>
        </div>
        ) : <Fragment />
    )
}

export default SignIn;