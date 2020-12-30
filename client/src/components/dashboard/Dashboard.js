import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';

const Dashboard = ({ auth: { isAuthenticated, loading }, profile: { profile }, getProfile }) => {
    useEffect( () => {
        getProfile();
        console.log("dashboard")
    }, []);

    if(!loading && !isAuthenticated) {
        return <Redirect to="/" />
    }

    if(isAuthenticated && !profile) {
        console.log("entered-2");
        return <Redirect to="/signup-two" />
    }

    if(isAuthenticated && profile && !profile.resume) {
        return <Redirect to="/signup-three" />
    }

    return (
        <div>
            Dashboard
        </div>
    )
}

Dashboard.propTypes = {
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   getProfile: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile })(Dashboard);