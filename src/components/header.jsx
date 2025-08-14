import { React, useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
  UserOutlined,
  LogoutOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import { Button, Avatar, Popover, Grid, Image } from "antd";
import { Offcanvas } from "react-bootstrap";
import Cart from "../pages/cart";
import { useCart } from "../context/cartContext";
import { BrandLogo } from "../assets";

const { useBreakpoint } = Grid;

const Header = ({ onLogout }) => {
  const { cart } = useCart();
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [brandIndex, setBrandIndex] = useState(0);

  const [myCart, setMyCart] = useState([]);

  const screens = useBreakpoint();

  const brandMessages = ["Pocket Mart", "Buy More", "Save More"];

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u || {});
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setBrandIndex((prevIndex) => (prevIndex + 1) % brandMessages.length);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    if (!window.confirm("Do you Logout!")) return;
    onLogout();
    navigate("/login");
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const mobileUserMenu = (
    <div style={{ textAlign: "center" }}>
      <div style={{ marginBottom: 8 }}>
        <strong>{user?.name || "Guest"}</strong>
      </div>
      <Button
        icon={<LogoutOutlined />}
        size="small"
        danger
        onClick={handleLogout}
      >
        Logout
      </Button>
    </div>
  );

  return (
    <>
      <div
        className="bg-dark text-white px-4 py-2 sticky-top mb-5"
        style={{
          display: location.pathname === "/billing" ? "none" : "flex",
          justifyContent: "space-between",
          alignItems: "center",
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: "64px",
          zIndex: 1000,
        }}
      >
        <Offcanvas show={show} onHide={handleClose} placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title>
              <b>Your Cart</b>
            </Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Cart onClose={handleClose} />
          </Offcanvas.Body>
        </Offcanvas>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            marginLeft: screens.sm || screens.xs ? "20px" : undefined,
          }}
        >
          <Image src={BrandLogo} height="50px" width="50px" />
          <h3 style={{ margin: 0, fontWeight: "600" }}>
            {brandMessages[brandIndex]}
          </h3>
        </div>

        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          {screens.md ? (
            <>
              <div>
                <UserOutlined /> Welcome {user?.name || "Guest"}
              </div>
              <Button
                icon={<LogoutOutlined />}
                size="small"
                danger
                onClick={handleLogout}
              >
                Logout
              </Button>
            </>
          ) : (
            <Popover
              placement="bottomRight"
              content={mobileUserMenu}
              trigger="click"
            >
              <Avatar
                icon={<UserOutlined />}
                style={{ backgroundColor: "#1890ff", cursor: "pointer" }}
              />
            </Popover>
          )}

          <div
            onClick={handleShow}
            style={{
              cursor: "pointer",
              fontSize: "18px",
              color: "white",
              display: "flex",
              alignItems: "center",
              position: "relative",
            }}
          >
            <ShoppingCartOutlined />
            {cart.length > 0 && (
              <span
                style={{
                  position: "absolute",
                  top: "-5px",
                  right: "-5px",
                  background: "red",
                  color: "white",
                  borderRadius: "50%",
                  fontSize: "12px",
                  width: "18px",
                  height: "18px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {cart.length}
              </span>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
