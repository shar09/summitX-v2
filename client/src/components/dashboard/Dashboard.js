import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

const Dashboard = ({ auth: { user }, profile: { profile, profileLoading }, getProfile }) => {
    useEffect( () => {
        console.log("dashboard");
        getProfile();
    }, [getProfile]);

    if(profileLoading) {    
        console.log("hello");
        return <Spinner />
    }
    else {    
        if(!user.isProfile) {
            return <Redirect to="/signup-two" />
        }

        if(user.isProfile && !user.isResume) {
            return <Redirect to="/signup-three" />
        }
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