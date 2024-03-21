import React from "react";
import './sidebar12.css'
import {Layout} from "antd";
import Logo from "./Logo";
import MenuList from "./MenuList";
const {Header,Sider} = Layout
const Sidebar = () => {
  return (
      <Sider className='sidebar'>
        <Logo/>
        <MenuList/>
      </Sider>
  );
};
export default Sidebar;
