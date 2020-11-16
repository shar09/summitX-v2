import React, { Fragment, useState } from 'react';
import './App.css';
import Navbar from './static-components/Navbar';
import Landing from './static-components/Landing';
import SignIn from './static-components/SignIn';
import SignUp from './static-components/SignUp';

const App = () => {
    const [ signInModalState, setSignInModalState ] = useState(false);
    const [ signUpModalState, setSignUpModalState ] = useState(false);

    return (
        <Fragment>
            <Navbar  setSignUpModalState={setSignUpModalState}
                setSignInModalState={setSignInModalState}
            />
            <Landing />
            <SignIn signInModalState={signInModalState} 
                setSignInModalState={setSignInModalState}
            />
            <SignUp signUpModalState={signUpModalState}
                setSignUpModalState={setSignUpModalState}
            />
        </Fragment>
  );
}

export default App;
