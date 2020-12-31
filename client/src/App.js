import React, { Fragment, useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import PrivateRoute from './components/routing/PrivateRoute';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import SignIn from './components/auth/SignIn';
import SignUpOne from './components/auth/signup/SignUpOne';
import SignUpTwo from './components/auth/signup/SignUpTwo';
import SignUpThree from './components/auth/signup/SignUpThree';
import Dashboard from './components/dashboard/Dashboard';
// Redux
import { Provider } from 'react-redux';
import store from './store';
import setAuthToken from './utils/setAuthToken';
import { loadUser } from './actions/auth';
import { SIGNOUT } from './actions/types';

import './App.css';

const App = () => {
    useEffect(() => {
        // check for token in LS
        if (localStorage.token) {
            setAuthToken(localStorage.token);
        }
        store.dispatch(loadUser());
    
        // log user out from all tabs if they log out in one tab
        window.addEventListener('storage', () => {
          if (!localStorage.token) store.dispatch({ type: SIGNOUT });
        });
    }, []);

    const [ signInModalState, setSignInModalState ] = useState(false);

    return (
        <Provider store={store}>
            <Router>
                <Fragment>
                    <Navbar setSignInModalState={setSignInModalState} />
                    <SignIn signInModalState={signInModalState} 
                        setSignInModalState={setSignInModalState}
                    />
                    <Switch>
                        <Route exact path="/" component={Landing} />
                        <Route exact path="/signup-one"> 
                            <SignUpOne setSignInModalState={setSignInModalState} />
                        </Route>
                        <PrivateRoute exact path="/signup-two" component={SignUpTwo} />
                        <PrivateRoute exact path="/signup-three" component={SignUpThree} />
                        <PrivateRoute exact path="/dashboard" component={Dashboard} />
                    </Switch>
                </Fragment>
            </Router>
        </Provider>
  );
}

export default App;
