// eslint-disable-next-line
import React, { useState } from "react";
import { Menu } from "antd";
import {
  AppstoreOutlined,
  LogoutOutlined,
  ShopOutlined,
} from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import "./../style.css";

const AppMenu: React.FC = () => {
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

  return (
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
      >
        DashBoard
      </Menu.Item>
      <Menu.Item
        key="CreateOrder"
        onClick={() => Route("CreateOrder")}
        icon={<ShopOutlined />}
      >
        Create Product
      </Menu.Item>
      <Menu.Item
        key="ManegeOrder"
        onClick={() => Route("ManegeOrder")}
        icon={<AppstoreOutlined />}
      >
        Manage Order
      </Menu.Item>
      <Menu.Item
        key="AdminProfile"
        onClick={() => Route("AdminProfile")}
        icon={<AppstoreOutlined />}
      >
        Setting
      </Menu.Item>

      <Menu.Item key="6" icon={<LogoutOutlined />}>
        Logout
      </Menu.Item>
    </Menu>
  );
};

export default AppMenu;