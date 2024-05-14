import React, { useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../components/assests/INFINITY-removebg-preview.png';
import { useNavigate } from 'react-router-dom';
import { GetUser, logoutUser } from './login/Auth';
import Seller from '../models/seller';
import { useSelector } from 'react-redux';
import { useQuery } from 'react-query';
import { useEffect } from 'react';

const Header = (props) => { // Accepting props here
    const [roles, setRoles] = useState([]);
    const [staff, setStaff] = useState(false);
    const [face, setFace] = useState(false);
    const [seller, setSeller] = useState(new Seller());
    const user = useSelector((state) => state.auth.user)
    const dropdownRef = useRef(null);

    const location = useLocation();
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

    useEffect(() => {
        if (!user) return;

        fetchUser(user);
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

            {!props.hideHeaderRight && ( // Conditional rendering here
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
            )}

            {isDropdownVisible && (
                <div ref={dropdownRef} className="dropdown-container">
                    <div className="container-dropdown">

                        <a className="dropdown-link colorChange">
                            <span className="icon colorChange">
                                <i class="fa-solid fa-phone"></i>
                            </span>
                            Contact Support
                        </a>

                        <hr />
                        {!isFormVisible && (roles.length > 0 ? false : true) && <Link to="/profile" onClick={() => setDropdownVisibility(false)} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-user"></i>
                            </span>
                            Profile
                        </Link>}
                        {!isFormVisible && (roles.length > 0 ? roles.includes("Transactions") : true) && <Link to="/payment-details" onClick={() => setDropdownVisibility(false)} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-circle-info"></i>
                            </span>
                            Payment Details
                        </Link>}
                        <Link to="/settings" onClick={() => setDropdownVisibility(false)} className="dropdown-link">
                            <span className="icon">
                                <i className="fa-solid fa-gear"></i>
                            </span>
                            Settings
                        </Link>
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
