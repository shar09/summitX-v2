import React, { useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { loadUser } from '../../actions/auth';
import { getProfile } from '../../actions/profile';
import Spinner from '../layout/Spinner';

// Profile Components
import PorfileTop from './ProfileTop';
import Experience from './Experience';

const Dashboard = ({ auth: { user }, profile: { profile, profileLoading }, getProfile }) => {
    useEffect( () => {
        console.log("dashboard");
        getProfile();
    }, [getProfile]);

    if(profileLoading) {    
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
        <section className="container">
            <PorfileTop profile={profile} />
            <div className="experience">
                <Experience experience={profile.experience} />
            </div>
        </section>
    )
}

Dashboard.propTypes = {
   auth: PropTypes.object.isRequired,
   profile: PropTypes.object.isRequired,
   getProfile: PropTypes.func.isRequired,
   loadUser: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    auth: state.auth,
    profile: state.profile
});

export default connect(mapStateToProps, { getProfile, loadUser })(Dashboard);