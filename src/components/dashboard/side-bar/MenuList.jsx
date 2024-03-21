import React, { useEffect, useRef, useState } from 'react'
import { Menu, message } from 'antd'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { HomeOutlined,ShopOutlined,ProductOutlined,ShoppingCartOutlined,WalletOutlined,CreditCardOutlined,UsergroupAddOutlined,UserOutlined,LogoutOutlined } from '@ant-design/icons'
import { useSelector } from 'react-redux'
import { logoutUser } from '../../login/Auth'

const MenuList = () => {
    const [loading, setLoading] = useState(true)
    const [staff, setStaff] = useState(false)
    const [face, setFace] = useState(false)
    const [roles, setRoles] = useState([])
    const location = useLocation()
    const user = useSelector((state) => state.auth.user)
    const navigate = useNavigate()
    const fetchUser = async (user) => {
        setStaff(user.isStaff)
        setRoles(user.roles)
        setFace(user.isFace)
        setLoading(false)
    }
    const hasEffect = useRef(false)
    useEffect(() => {
        if (!user || hasEffect.current) return
        fetchUser(user)
        hasEffect.current = true
    }, [user])
    const logout = async () =>{
        await logoutUser()
        message.success("Logout successfully")
        navigate("/")
    }
    const menuItems = [
        {
            name: "Dashboard",
            route: "/dashboard",
            icon: <HomeOutlined />,
            show: true
        },
        {
            name: "Store",
            route: "/store-details",
            icon: <ShopOutlined />,
            show: roles.length > 0 ? roles.includes("Store") : true,
        },
        {
            name: "Products",
            route: "/product-details",
            icon: <ProductOutlined />,
            show: roles.length > 0 ? roles.includes("Products") : true,
        },
        {
            name: "Orders",
            route: "/orders",
            icon: <ShoppingCartOutlined />,
            show: true,
            show: roles.length > 0 ? roles.includes("Orders") : true,
        },
        {
            name: "Rentals",
            route: "/rentals",
            icon: <WalletOutlined />,
            show: true,
            show: roles.length > 0 ? roles.includes("Rentals") : true,
        },
        {
            name: "Transactions",
            route: "/payment-details",
            icon: <CreditCardOutlined />,
            show: roles.length > 0 ? roles.includes("Transactions") : true,
        },
        {
            name: "Access",
            route: "/access",
            icon: <UsergroupAddOutlined />,
            show: roles.length > 0 ? roles.includes("Access") : true,
        },
        {
            name: "Profile",
            route: "/profile",
            icon: <UserOutlined />,
            show: roles.length > 0 ? false : true,
        },
    ];
    const defaultSelectedKey = menuItems.find(item => location.pathname.startsWith(item.route))?.route || '/dashboard';

    return (
        <Menu theme="dark" className='menu-bar' defaultSelectedKeys={[defaultSelectedKey]}>
            {menuItems.map((item) => (
                item.show && (
                    <Menu.Item key={item.route} icon={item.icon}>
                        <Link to={item.route}>{item.name}</Link>
                    </Menu.Item>
                )
            ))}
            <Menu.Item key="logout" icon={<LogoutOutlined />} style={{ marginTop: 'auto' }} onClick={logout}>
                Logout
            </Menu.Item>
        </Menu>
    )
}


export default MenuList
