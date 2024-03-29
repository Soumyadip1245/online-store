import React from "react";
import './sidebar12.css'
import Logo from '../../assests/INFINITY-removebg-preview.png'
import {Layout} from "antd";
import MenuList from "./MenuList";
import AppInfo from "../AppInfo";
const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <div className="sidebar-logo">
        <div className="image-logo">
          <img src={Logo} alt="" />
        </div>
      </div>
      <MenuList/>
      <AppInfo />
    </div>
     
  );
};
export default Sidebar;
