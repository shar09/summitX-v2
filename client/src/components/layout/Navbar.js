import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ setSignInModalState }) => { 
    const [ menu, toggleMenu ] = useState(false);
    
    return (
        <div className="navbar">
            <a href="#" className="company-logo">summit<span>X</span></a>
            <button class="menu-icon"
                onClick={() => toggleMenu(!menu)}
            >
               { !menu ?  <i class="fas fa-bars"/> : <i className="fas fa-times"/> }
            </button>
            <div className={!menu ? "navbar-collapse" : "navbar-collapse-active"}>
                <ul className="nav-links">
                    <li className="nav-item">
                        <a href="#" className={!menu || window.innerWidth > 768 ? "btn-primary" : "nav-item-default"}
                            onClick={() => toggleMenu(!menu)}
                        >Job Seekers</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={!menu || window.innerWidth > 768 ? "btn-primary" : "nav-item-default"}
                            onClick={() => toggleMenu(!menu)}
                        >Employers</a>
                    </li>
                    <li className="nav-item">
                        <Link to="/" class="nav-item-default" 
                            onClick={() => { setSignInModalState(true); toggleMenu(!menu) }}
                        >Sign In</Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;