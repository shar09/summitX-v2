import React, { Fragment, useState } from 'react';
import './App.css';
import Navbar from './static-components/Navbar';
import Landing from './static-components/Landing';
import SignIn from './static-components/SignIn';

const App = () => {
    const [ signInModalState, setSignInModalState ] = useState(false);

    return (
        <Fragment>
            <Navbar setSignInModalState={setSignInModalState} />
            <Landing />
            <SignIn signInModalState={signInModalState} 
                setSignInModalState={setSignInModalState}
            />
        </Fragment>
  );
}

export default App;
