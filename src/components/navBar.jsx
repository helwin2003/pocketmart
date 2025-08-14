import React, { useState } from "react";
import {
  HomeOutlined,
  ShoppingCartOutlined,
  MenuOutlined,
  CloseOutlined,
} from "@ant-design/icons";
import { Layout, Menu, Button, Grid, Drawer, theme } from "antd";
import { Link, useLocation } from "react-router-dom";
import "./navBar.css";

const { Sider } = Layout;
const { useBreakpoint } = Grid;

const NavBar = () => {
  const location = useLocation();
  const screens = useBreakpoint();
  const [menuVisible, setMenuVisible] = useState(false);

  const currentPath = location.pathname;

  const pathToKeyMap = {
    "/home": "1",
    "/grocery/fruveg": "2-1",
    "/grocery/bakery": "2-2",
    "/fashion/dress": "3-1",
    "/fashion/accessories": "3-2",
  };

  const selectedKey = pathToKeyMap[currentPath] || "1";

  const menuItems = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: <Link to="/home">Home</Link>,
    },
    {
      type: "group",
      label: "Categories",
      children: [
        {
          key: "2",
          icon: <ShoppingCartOutlined />,
          label: "Grocery",
          children: [
            {
              key: "2-1",
              label: <Link to="/grocery/fruveg">Fruits/Vegetables</Link>,
            },
            {
              key: "2-2",
              label: <Link to="/grocery/bakery">Bakery</Link>,
            },
          ],
        },
        {
          key: "3",
          icon: <ShoppingCartOutlined />,
          label: "Fashion",
          children: [
            {
              key: "3-1",
              theme: "dark",
              label: <Link to="/fashion/dress">Dress</Link>,
            },
            {
              key: "3-2",
              label: <Link to="/fashion/accessories">Accessories</Link>,
            },
          ],
        },
      ],
    },
  ];

  const menuComponent = (
    <Menu
      mode="inline"
      theme="dark"
      selectedKeys={[selectedKey]}
      defaultOpenKeys={["2"]}
      items={menuItems}
      onClick={() => setMenuVisible(false)}
      style={{
        height: "100%",
        backgroundColor: "#001529",
        display: location.pathname === "/billing" && "none",
      }}
    />
  );

  return (
    <>
      {/* Toggle Button */}
      {!screens.md && (
        <Button
          type="text"
          icon={
            menuVisible ? (
              <CloseOutlined style={{ color: "white" }} />
            ) : (
              <MenuOutlined
                style={{
                  color: "white",
                  display: location.pathname === "/billing" && "none",
                }}
              />
            )
          }
          onClick={() => setMenuVisible(!menuVisible)}
          id="toggle-button"
        />
      )}

      {/* Desktop Sidebar */}
      {screens.md || screens.lg ? (
        <Sider
          width={200}
          theme="dark"
          className={`site-layout-background fixed-sider`}
          style={{ display: location.pathname === "/billing" && "none" }}
        >
          {menuComponent}
        </Sider>
      ) : (
        // Mobile Drawer
        <Drawer
          className="sticky-top"
          placement="left"
          closable={false} // We use our own close button
          onClose={() => setMenuVisible(false)}
          open={menuVisible}
          bodyStyle={{
            padding: 0,
            backgroundColor: "#001529",
            color: "#fff",
          }}
          width={200}
          zIndex={1200}
        >
          <div className="mt-5" />
          {menuComponent}
        </Drawer>
      )}
    </>
  );
};

export default NavBar;
