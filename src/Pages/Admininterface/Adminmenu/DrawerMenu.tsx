import { Drawer, Menu } from "antd";
import { MenuOutlined } from "@ant-design/icons";

import React, { useState } from "react";
import { toast } from "react-toastify";
import useAuth from "./../../../hooks/useAuth";
import './style.css'
import { useNavigate } from "react-router-dom";
import {
    AppstoreOutlined,
    LogoutOutlined,
    ShopOutlined,
  } from "@ant-design/icons";
interface DrawerMenuProps {
  visible: boolean;
  onClose: () => void;
}

  
const DrawerMenu: React.FC<DrawerMenuProps> = ({ visible, onClose }) => {
    const { logout } = useAuth();
    const navigate = useNavigate();
  
    const { SubMenu } = Menu;
  
    const [collapsed, setCollapsed] = useState(false);
    const [defaultSelectedKey, setDefaultSelectedKey] = useState<string | null>(
      null
    );
  
    const Route = (key: string) => {
      setDefaultSelectedKey(key);
      navigate(`/${key}`);
    };
  
  
    const handleLogout = async () => {
      try {
        toast.success("Logout successful!");
        setTimeout(() => logout(), 2000);
      } catch (error) {
        console.log(error);
      }
    };
  return (
    <Drawer title="Menu" placement="top" onClose={onClose}  className="custom-drawer" open={visible}>
      <Menu
      selectedKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
      defaultOpenKeys={defaultSelectedKey ? [defaultSelectedKey] : []}
      mode="inline"
      theme="dark"
      inlineCollapsed={collapsed}
      style={{ height: "100%" }}
    >
      <Menu.Item
        key="AdminDashboard"
        onClick={() => Route("AdminDashboard")}
        icon={<AppstoreOutlined />}
        style={{fontSize:'20px'}}
      >
        DashBoard
      </Menu.Item>
      <Menu.Item
        key="CreateOrder"
        onClick={() => Route("CreateOrder")}
        icon={<ShopOutlined />}
        style={{fontSize:'20px'}}
      >
        Create Product
      </Menu.Item>
      <Menu.Item
        key="ManegeOrder"
        onClick={() => Route("ManegeOrder")}
        icon={<AppstoreOutlined />}
        style={{fontSize:'20px'}}
      >
        Manage Order
      </Menu.Item>
      <Menu.Item
        key="AdminProfile"
        onClick={() => Route("AdminProfile")}
        icon={<AppstoreOutlined />}
        style={{fontSize:'20px'}}
      >
        Setting
      </Menu.Item>

      <Menu.Item key="6" onClick={handleLogout} icon={<LogoutOutlined />}
             style={{fontSize:'20px'}}>
        Logout
      </Menu.Item>
    </Menu>
    </Drawer>
  );
};

export default DrawerMenu;
