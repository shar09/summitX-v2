import React, { useState } from 'react';

const Navbar = ({ setSignInModalState }) => { 
    const [ menu, toggleMenu ] = useState(true);
    
    return (
        <div className="navbar">
            <a href="#" className="company-logo">summit<span>X</span></a>
            <button class="menu-icon"
                onClick={() => toggleMenu(!menu)}
            >
               { menu ?  <i class="fas fa-bars"/> : <i className="fas fa-times"/> }
            </button>
            <div className={menu ? "navbar-collapse" : "navbar-collapse-active"}>
                <ul className="nav-links">
                    <li className="nav-item">
                        <a href="#" className={menu ? "btn-primary" : "nav-item-default"}
                        >Job Seekers</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" className={menu ? "btn-primary" : "nav-item-default"}>Employers</a>
                    </li>
                    <li className="nav-item">
                        <a href="#" class="nav-item-default" onClick={() => setSignInModalState(true)}>Sign In</a>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default Navbar;