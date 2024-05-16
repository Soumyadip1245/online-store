import React, { useEffect, useRef, useState } from 'react'
import { Menu, message } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined, ShopOutlined, ProductOutlined, ShoppingCartOutlined, WalletOutlined, CreditCardOutlined, UsergroupAddOutlined, UserOutlined, LogoutOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { GetUser, logoutUser } from '../../login/Auth'
import Seller from '../../../models/seller'
import { useQuery } from 'react-query'
import i18n from '../../../utils/i18n'
import { useTranslation } from "react-i18next";


const MenuList = () => {
    const { t } = useTranslation();

    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState(false)
    const [face, setFace] = useState(false)
    const [roles, setRoles] = useState([])
    const [seller, setSeller] = useState(new Seller());
    const location = useLocation()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const fetchUser = async (user) => {
        setStaff(user.isStaff)
        setRoles(user.roles)
        setFace(user.isFace)
        setLoading(false)

    }
    const fetchData = async () => {
        return await GetUser(user);
    };
    const { data, isLoading } = useQuery("sidebar", fetchData, { enabled: !!user })

    useEffect(() => {
        if (data) setSeller(data)
    }, [data])
    const hasEffect = useRef(false)
    useEffect(() => {
        if (!user || hasEffect.current) return
        fetchUser(user)
        hasEffect.current = true
    }, [user])
    
    const isFormVisible = seller.sellerName === '' && seller.paymentDetails.accountNumber === '';
    console.log(isFormVisible)
    const menuItems = [
        {
            name: `${t('sidebar.sidebar1')}`,
            route: "/dashboard",
            icon: <i class="fa-solid fa-house"></i>,
            show: true
        },
        {
            name: `${t('sidebar.sidebar2')}`,
            route: "/store-details",
            icon: <i class="fa-solid fa-cart-shopping"></i>,
            show: !isFormVisible && (roles.length > 0 ? roles.includes("Store") : true),
        },
        {
            name: `${t('sidebar.sidebar3')}`,
            route: "/product-details",
            icon: <i class="fa-solid fa-utensils"></i>,
            show: !isFormVisible && (roles.length > 0 ? roles.includes("Products") : true),
        },
        {
            name: `${t('sidebar.sidebar4')}`,
            route: "/orders",
            icon: <i class="fa-solid fa-truck"></i>,
            show: !isFormVisible && (roles.length > 0 ? roles.includes("Orders") : true),
        },
        {
            name: `${t('sidebar.sidebar5')}`,
            route: "/explore",
            icon: <i class="fa-solid fa-code-compare"></i>,
            show: true,
        },
        {
            name: `${t('sidebar.sidebar6')}`,
            route: "/rentals",
            icon: <i class="fa-solid fa-rectangle-list"></i>,
            show: !isFormVisible && (roles.length > 0 ? roles.includes("Rentals") : true),
        },
       
        {
            name: `${t('sidebar.sidebar7')}`,
            route: "/access",
            icon: <i class="fa-solid fa-clipboard-user"></i>,
            show: !isFormVisible && (roles.length > 0 ? roles.includes("Access") : true),
        }
      
       
       
    ];
    const defaultSelectedKey = menuItems.find(item => location.pathname.startsWith(item.route))?.route || '/dashboard';

    return (
        <>
            {menuItems.map((item) => (
                item.show && (

                    <Link className="menu-link" to={item.route} key={item.route} onClick={()=>window.scrollTo(0, 0)}>
                       <div className={`sidebar-link ${item.route === defaultSelectedKey ? 'sidebar-hover' : ''}`}>
                            <div className="sidebar-icon">
                                {item.icon}
                            </div>
                            <div className="sidebar-text">
                                {item.name}
                            </div>
                        </div>
                    </Link>
                    
                )
            ))}
            
        </>
    );
    
}


export default MenuList
