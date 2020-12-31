import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';

const Dashboard = ({ auth: { isAuthenticated, loading }, profile: { profile }, getProfile }) => {
    useEffect( () => {
        getProfile();
    }, [getProfile]);

    if(!profile) {
        return <Redirect to="/signup-two" />
    }

    if(profile && !profile.resume) {
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