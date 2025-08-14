import { React, useEffect } from "react";
import { Container, Modal, Col, Row } from "react-bootstrap";
import {
  CheckCircleTwoTone,
  CreditCardOutlined,
  ShoppingCartOutlined,
  FileTextOutlined,
  GiftOutlined,
  DeliveredProcedureOutlined,
} from "@ant-design/icons";
import { motion } from "framer-motion";
import BackgroundWrap from "../utils/backgroundWrapper";
import { BrandLogo, GreetingBg, Seal } from "../assets";
import { Grid } from "antd";
import { useCart } from "../context/cartContext";
import { Toaster, toast } from "react-hot-toast";
import Footer from "../components/footer";
import { useNavigate } from "react-router-dom";

const { useBreakpoint } = Grid;

const Greeting = ({ show, onClose, user, paymentMethod, myBill }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();
  const { clearCart } = useCart();
  const invoiceNumber = Math.floor(100000 + Math.random() * 900000);

  const isOnlinePayment = paymentMethod === "card" || paymentMethod === "upi";

  useEffect(() => {
    if (!show) return;
    setTimeout(() => {
      navigate("/home");
      clearCart();
      toast.success("Your product Shipped Successfully");
    }, 15000);
  }, [show, navigate, clearCart]);

  return (
    <Modal
      show={show}
      onHide={onClose}
      fullscreen
      centered
      className="bg-dark"
      contentClassName="border-0 shadow-lg"
    >
      {/* Header */}
      <Modal.Header
        style={{
          zIndex: 1500,
          background: "linear-gradient(150deg, #6d99f7ff, #d679caff)",
        }}
        className="justify-content-center align-items-center py-3"
      >
        <div className="d-flex align-items-center gap-3">
          <img
            src={BrandLogo}
            alt="Brand Logo"
            width={screens.xs ? "40" : "50"}
            height={screens.xs ? "40" : "50"}
            className="rounded-circle shadow-sm"
          />
          <h2
            className="m-0 fw-bold text-white"
            style={{
              fontFamily: "sans-serif",
              fontSize: screens.xs ? "1.5rem" : "2rem",
            }}
          >
            POCKET MART
          </h2>
        </div>
      </Modal.Header>

      {/* Background Section */}
      <BackgroundWrap backgroundImage={GreetingBg} opacity={0.4}>
        <Modal.Body
          className="d-flex flex-column justify-content-center align-items-center text-center py-4 px-3"
          style={{ minHeight: screens.xs ? "auto" : "80vh" }}
        >
          <Container
            fluid
            className="p-4 rounded shadow-lg"
            style={{
              maxWidth: screens.sm ? "500px" : "90%",
              background: "rgba(255, 255, 224, 0.85)",
            }}
          >
            {/* Icon Animation */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 120, delay: 0.2 }}
              className="mb-3"
            >
              {isOnlinePayment ? (
                <CreditCardOutlined
                  style={{ fontSize: "4rem", color: "#1890ff" }}
                />
              ) : (
                <ShoppingCartOutlined
                  style={{ fontSize: "4rem", color: "#faad14" }}
                />
              )}
            </motion.div>

            {/* Title */}
            <motion.h3
              className="fw-bold mb-3"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              style={{ fontSize: screens.xs ? "1.2rem" : "1.5rem" }}
            >
              <CheckCircleTwoTone /> Thank You, {user?.name || "Customer"}!
            </motion.h3>

            {/* Details */}
            {isOnlinePayment ? (
              <>
                <motion.p
                  className="lead mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <CreditCardOutlined style={{ color: "#1890ff" }} /> Payment
                  successful: <strong>{myBill}</strong>
                </motion.p>
                <motion.p
                  className="fw-bold mb-2"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <FileTextOutlined style={{ color: "#722ed1" }} /> Invoice:{" "}
                  <span style={{ color: "#1890ff" }}>{invoiceNumber}</span>
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1 }}
                >
                  <GiftOutlined /> Product will be delivered within 2 days.
                </motion.p>
              </>
            ) : (
              <>
                <motion.p
                  className="lead mb-2"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                >
                  <ShoppingCartOutlined style={{ color: "#faad14" }} /> Order
                  placed successfully!
                </motion.p>
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <DeliveredProcedureOutlined style={{ color: "#52c41a" }} />{" "}
                  Delivered in 2 days. <br /> Kindly hand{" "}
                  <strong>{myBill}</strong> to our delivery partner upon
                  delivery.
                </motion.p>
              </>
            )}

            {/* Waiting Note */}
            <motion.div
              className="mt-3 fw-bold"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
            >
              Please wait! Your product ships in 15 seconds
            </motion.div>

            {/* Seal Image */}
            <Row className="mt-4">
              <Col className="text-center">
                <img
                  src={Seal}
                  alt="Seal"
                  width={screens.xs ? "80" : "120"}
                  style={{ opacity: 0.5 }}
                />
              </Col>
            </Row>
          </Container>
        </Modal.Body>
        <Toaster position="top-center" />
      </BackgroundWrap>

      {/* Footer fixed to bottom */}
      <div style={{ zIndex: 1500 }} className="position-fixed bottom-0 w-100">
        <Footer />
      </div>
    </Modal>
  );
};

export default Greeting;
