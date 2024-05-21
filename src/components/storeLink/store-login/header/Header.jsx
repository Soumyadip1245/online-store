import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { logoutUserForstore } from '../../../login/Auth';

const Header = ({hideHeaderRight,setShow}) => {

    const dropdownRef = useRef(null);

    const location = useLocation();
    const navigate = useNavigate();

    const [isDropdownVisible, setDropdownVisibility] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    };

    const logout = async () => {
        await logoutUserForstore();
        navigate("/");
    };

    return (
        <div className={`header-container custom-color`}>
            <div className={`footer-logo custom-logo-left`}>
                <span className='logo-foot'>
                    <i className={`fa-solid fa-truck-ramp-box logo-color custom-logo-color`}></i>
                </span>
                <span className='logo-name'>Digital Drift</span>
            </div>

            {!hideHeaderRight && (
                <div className="header-right" onClick={toggleDropdown}>
                    <div className="menu-controls">
                        <div className="three-lines">
                            <span className="lines-logo">
                                <i className="fa-solid fa-bars" style={{ fontSize: '20px' }}></i>
                            </span>
                        </div>
                        <span className="arrow-show">
                            <i className={`fa-solid ${isDropdownVisible ? 'fa-chevron-up' : 'fa-chevron-down'}`} style={{ fontSize: '20px' }}></i>
                        </span>
                    </div>
                </div>
            )}

            {isDropdownVisible && (
                <div ref={dropdownRef} className="dropdown-container">
                    <div className="container-dropdown">
                    <Link  onClick={() => {setShow("store"); setDropdownVisibility(false)}} className="dropdown-link">
                            <span className="icon">
                            <i class="fa-solid fa-store"></i>
                            </span>
                            Store
                        </Link>
                    <Link  onClick={() => {setShow("cart"); setDropdownVisibility(false)}} className="dropdown-link">
                            <span className="icon">
                            <i class="fa-solid fa-cart-shopping"></i>
                            </span>
                            Cart
                        </Link>
                    <Link  onClick={() => {setShow("orders"); setDropdownVisibility(false)}} className="dropdown-link">
                            <span className="icon">
                            <i class="fa-solid fa-truck"></i>
                            </span>
                            Orders
                        </Link>
                    <Link  onClick={() => {logoutUserForstore(); setShow("store");setDropdownVisibility(false)}} className="dropdown-link">
                            <span className="icon">
                            <i class="fa-solid fa-right-from-bracket"></i>
                            </span>
                            Logout
                        </Link>
                        
                        <hr />
                        <div className="icon-logo">
                            <a href="#" className="icon-anchor">
                                <span className="logo-icon">
                                    <i className="fa-brands fa-github"></i>
                                </span>
                            </a>
                            <a href="#" className="icon-anchor">
                                <span className="logo-icon">
                                    <i className="fa-brands fa-github"></i>
                                </span>
                            </a>
                            <a href="#" className="icon-anchor">
                                <span className="logo-icon">
                                    <i className="fa-brands fa-github"></i>
                                </span>
                            </a>
                            <a href="#" className="icon-anchor">
                                <span className="logo-icon">
                                    <i className="fa-brands fa-github"></i>
                                </span>
                            </a>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Header;
