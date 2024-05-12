import React, { useRef, useState } from 'react';
import Logo from '../components/assests/INFINITY-removebg-preview.png';
import { useLocation, useNavigate } from 'react-router-dom';
import { GetUser, logoutUser } from './login/Auth';
import Seller from '../models/seller';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

const Header = () => {
    const [roles, setRoles] = useState([]);
    const [staff, setStaff] = useState(false);
    const [face, setFace] = useState(false);
    const [seller, setSeller] = useState(new Seller());
    const dropdownRef = useRef(null);

    const location = useLocation();
    const user = useSelector((state) => state.auth.user);
    const navigate = useNavigate();

    const fetchUser = async (user) => {
        setStaff(user.isStaff);
        setRoles(user.roles);
        setFace(user.isFace);
    };

    const fetchData = async () => {
        return await GetUser(user);
    };

    const { data, isLoading } = useQuery("sidebar", fetchData, { enabled: !!user });

    useEffect(() => {
        if (data) setSeller(data);
    }, [data]);

    const hasEffect = useRef(false);

    useEffect(() => {
        if (!user || hasEffect.current) return;
        fetchUser(user);
        hasEffect.current = true;
    }, [user]);

    const isFormVisible = seller.sellerName === '' && seller.paymentDetails.accountNumber === '';

    const [isDropdownVisible, setDropdownVisibility] = useState(false);

    const toggleDropdown = () => {
        setDropdownVisibility(!isDropdownVisible);
    };

    const openDropdown = () => {
        setDropdownVisibility(true);
    };

    const logout = async () => {
        await logoutUser();
        navigate("/");
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownVisibility(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [dropdownRef]);

    return (
        <div className='header-container'>
            <div className="login-header">
                <div className='img-logo'><img className='img-fire' src={Logo} alt="logo" /></div>
                <h2>Online Stores</h2>
            </div>

            <div className="header-right">
                <div className="menu-controls" onMouseDown={toggleDropdown} onMouseUp={openDropdown}>
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

            {isDropdownVisible && (
                <div ref={dropdownRef} className="dropdown-container">
                    <div className="container-dropdown">
                        {!isFormVisible && (roles.length > 0 ? false : true) && <a onClick={() => { navigate('/profile'); setDropdownVisibility(false); }} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            Profile
                        </a>}
                        {!isFormVisible && (roles.length > 0 ? roles.includes("Transactions") : true) && <a onClick={() => { navigate('/payment-details'); setDropdownVisibility(false); }} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-circle-info"></i>
                            </span>
                            Payment Details
                        </a>}
                        <a onClick={() => { navigate('/settings'); setDropdownVisibility(false); }} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-gear"></i>
                            </span>
                            Settings
                        </a>
                        <a className="dropdown-link" onClick={() => { logout(); setDropdownVisibility(false); }}>
                            <span className="icon">
                                <i className="fa-solid fa-arrow-right-from-bracket"></i>
                            </span>
                            Logout
                        </a>
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
