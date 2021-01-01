import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signOut } from '../../actions/auth';

const Navbar = ({ setSignInModalState, isAuthenticated, signOut }) => { 
    const [ menu, toggleMenu ] = useState(false);

    const guestLinks = (
        <ul className="nav-links">
            <li className="nav-item">
                <Link to="/signup-one" className={!menu || window.innerWidth > 768 ? "btn-primary" : "nav-item-default"}
                    onClick={() => toggleMenu(!menu)}
                >Job Seekers</Link>
            </li>
            <li className="nav-item">
                <Link to="/contact" className={!menu || window.innerWidth > 768 ? "btn-primary" : "nav-item-default"}
                    onClick={() => toggleMenu(!menu)}
                >Employers</Link>
            </li>
            <li className="nav-item">
                <span className="nav-item-default" 
                    onClick={() => { setSignInModalState(true); toggleMenu(!menu) }}
                >Sign In</span>
            </li>
        </ul>
    )

    const authLinks = (
        <ul className="nav-links">
            <li className="nav-item">
                <Link to="/dashboard" className={!menu || window.innerWidth > 768 ? "btn-primary" : "nav-item-default"}
                    onClick={() => toggleMenu(!menu)}
                >Dashboard</Link>
            </li>
            <li className="nav-item">
                <a href="#" className="nav-item-default"
                    onClick={() => toggleMenu(!menu)}
                >Account</a>
            </li>
            <li className="nav-item">
                <span className="nav-item-default" 
                    onClick={() => { signOut(); toggleMenu(!menu) }}
                >Sign Out</span>
            </li>
        </ul>
    )
    
    return (
        <div className="navbar">
            <Link to="/" className="company-logo">summit<span>X</span></Link>
            <button className="menu-icon"
                onClick={() => toggleMenu(!menu)}
            >
               { !menu ?  <i className="fas fa-bars"/> : <i className="fas fa-times"/> }
            </button>
            <div className={!menu ? "navbar-collapse" : "navbar-collapse-active"}>
                { isAuthenticated ? authLinks : guestLinks }
            </div>
        </div>
    )
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool,
    signOut: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
});

export default connect(mapStateToProps, { signOut })(Navbar);