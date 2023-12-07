import { AppstoreOutlined, LogoutOutlined, SettingOutlined, ShopOutlined } from '@ant-design/icons';
import { Menu } from 'antd';

import React, { useState } from 'react';
import './../style.css';

const AppMenu: React.FC = () => {
  
  const { SubMenu } = Menu;

  const [collapsed, setCollapsed] = useState(false);

 
  return (

   
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="dark"
          inlineCollapsed={collapsed}
          style={{ height: '100%' }}
        >
          <Menu.Item key="1" icon={<AppstoreOutlined />}>
            DashBoard
          </Menu.Item>
          <Menu.Item key="2" icon={<ShopOutlined />}>
            Create Product
          </Menu.Item>
          <Menu.Item key="3" icon={<AppstoreOutlined />}>
            Manage Order
          </Menu.Item>
          <SubMenu key="sub1" icon={<SettingOutlined />} title="Setting">
            <Menu.Item key="4">General</Menu.Item>
            <Menu.Item key="5">Security</Menu.Item>
          </SubMenu>
          <Menu.Item key="6" icon={<LogoutOutlined />}>
            Logout
          </Menu.Item>
        </Menu>
     
   
  );
};

export default AppMenu;
