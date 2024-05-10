import React from "react";
import './sidebar12.css'
import Logo from '../../assests/INFINITY-removebg-preview.png'
import {Layout} from "antd";
import MenuList from "./MenuList";
import AppInfo from "../AppInfo";
const Sidebar = () => {
  return (
    <div className="sidebar-content">
      <MenuList/>
      <AppInfo />
    </div>
     
  );
};
export default Sidebar;
