import React, { useState } from "react";
import { motion } from "framer-motion";
import { Card, Container, Form } from "react-bootstrap";
import { Input, Button, Checkbox } from "antd";
import users from "../data/user.json";
import { useNavigate } from "react-router-dom";
import BackgroundWrap from "../utils/backgroundWrapper";
import { LoginBg } from "../assets";
import { CodeOutlined } from "@ant-design/icons";
import Footer from "../components/footer";

const Login = ({ onLogin }) => {
  const [user, setUser] = useState({ username: "", password: "" });
  const [autoFill, setAutoFill] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const handleLogin = (e) => {
    e.preventDefault();
    const matchedUser = users.find(
      (u) => u.username == user.username && u.password === user.password
    );
    if (matchedUser) {
      sessionStorage.setItem("user", JSON.stringify(matchedUser));
      sessionStorage.setItem("isLoggedIn", "true");
      onLogin();
      navigate("/home");
    } else {
      setError("Invalid username or password");
    }
  };
  const handleAutoFill = (e) => {
    const checked = e.target.checked;
    setAutoFill(checked);
    if (checked) {
      setUser({ username: "stutzen", password: "123" });
    } else {
      setUser({ username: "", password: "" });
    }
  };
  return (
    <BackgroundWrap backgroundImage={LoginBg} opacity={0.5}>
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="d-flex align-items-center justify-content-center vh-100"
      >
        <Card className="w-100" style={{ maxWidth: 400 }}>
          <Card.Header>
            <Card.Title className="text-center">Login</Card.Title>
          </Card.Header>
          <Card.Body
            style={{
              background: "linear-gradient(170deg, #7a8db4ff, #a08fceff)",
            }}
          >
            <Form onSubmit={handleLogin}>
              <div className="mb-3">
                <label>Username</label>
                <Input
                  name="username"
                  type="text"
                  placeholder="Enter Username"
                  value={user.username}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <label>Password</label>
                <Input.Password
                  name="password"
                  placeholder="Enter password"
                  value={user.password}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-3">
                <Checkbox checked={autoFill} onChange={handleAutoFill}>
                  Autofill
                </Checkbox>
              </div>
              {error && (
                <div className="text-danger mb-2 text-center">{error}</div>
              )}
              <Button
                htmlType="submit"
                type="primary"
                block
                disabled={!user.username || !user.password}
                style={{
                  background: "linear-gradient(90deg, #6d99f7ff, #5d2ce4ff)",
                  border: "none",
                  color: "#fff",
                }}
              >
                Login
              </Button>
            </Form>
          </Card.Body>
          <Card.Footer className="bg-light border" style={{}}>
            <Footer />
          </Card.Footer>
        </Card>
      </motion.div>
    </BackgroundWrap>
  );
};

export default Login;
