import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import Proptypes from 'prop-types';
import { connect } from 'react-redux';
import Spinner from '../layout/Spinner';

const PrivateRoute = ({
    component: Component,
    auth: { isAuthenticated, loading },
    ...rest
}) => (
    <Route 
        {...rest}
        render={ props => 
            loading ? (
                <Spinner /> 
            ) : isAuthenticated ? (
                <Component {...props} />
            ) : (
                <Redirect to="/" /> 
            )
        }
    />
);

PrivateRoute.propTypes = {
    auth: Proptypes.object.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
