import React, { Fragment, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import Dashboard from './components/dashboard/Dashboard';

// Redux
import { Provider } from "react-redux";
import store from "./store";

import './App.css';

const App = () => {
    const [ signInModalState, setSignInModalState ] = useState(false);

    return (
        <Provider store={store}>
            <SignIn signInModalState={signInModalState} 
                setSignInModalState={setSignInModalState}
            />
            <Router>
                <Fragment>
                    <Navbar setSignInModalState={setSignInModalState} />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
  );
}

export default App;
