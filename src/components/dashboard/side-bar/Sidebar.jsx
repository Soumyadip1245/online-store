import React from "react";
import './sidebar12.css'
import Logo from '../../assests/INFINITY-removebg-preview.png'
import {Layout} from "antd";
import MenuList from "./MenuList";
const {Header,Sider} = Layout
const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <div className="sidebar-logo">
        <div className="image-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <MenuList/>
    </div>
     
  );
};
export default Sidebar;
