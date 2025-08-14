import React, { useState, useEffect } from "react";
import { Modal, Button, Radio, Card, message, Checkbox, Input } from "antd";
import { useCart } from "../context/cartContext";
import { useNavigate } from "react-router-dom";
import { Container, Row, Col, Form } from "react-bootstrap";
import { BillingBg, PaymentBg, Seal } from "../assets";
import BackgroundWrap from "../utils/backgroundWrapper";
import { motion } from "framer-motion";
import Greeting from "./final";

const Billing = () => {
  const { cart, getTotal } = useCart();
  const [user, setUser] = useState({});
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [isPaymentDone, setIsPaymentDone] = useState(false);

  const [isSelf, setIsSelf] = useState(false);
  const [showGreeting, setShowGreeting] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const u = JSON.parse(sessionStorage.getItem("user"));
    setUser(u || {});
  }, []);

  const handlePayment = (e) => {
    e.preventDefault();
    message.success("Payment successful!");
    setIsPaymentDone(true);

    setShowGreeting(true);
  };

  const handleGreetingClose = () => {
    setShowGreeting(false);
  };

  return (
    <BackgroundWrap backgroundImage={BillingBg} opacity={0.1}>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7 }}
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "1.5rem",
        }}
      >
        <Container
          className="bg-white p-4 rounded shadow"
          style={{
            maxWidth: "650px",
            backgroundImage: `linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.9)), url(${PaymentBg})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Header */}
          <div className="bg-secondary text-center w-100 py-2 rounded">
            <h4 className="mb-0 text-white fw-bold">
              POCKET MART -{" "}
              <i style={{ fontFamily: "cursive" }}>Payment Gateway</i>
            </h4>
          </div>

          {/* User Name */}
          <h4
            className="text-center mt-4 mb-4"
            style={{
              color: "#00509e",
              fontWeight: "bolder",
              fontFamily: "revert-layer",
            }}
          >
            <i>{user.name}</i>
          </h4>

          {/* Form */}
          <Form onSubmit={handlePayment}>
            <div className="d-flex flex-column align-items-center">
              <Checkbox
                checked={isSelf}
                onChange={(e) => setIsSelf(e.target.checked)}
                className="mb-4"
              >
                Order for you?
              </Checkbox>

              {/* Input Fields */}
              <Row className="w-100 justify-content-center g-3">
                <Col md={6} sm={12}>
                  <Input
                    value={isSelf ? user.name : undefined}
                    placeholder="Enter name"
                    readOnly={isSelf}
                    required
                    size="large"
                  />
                </Col>

                <Col md={6} sm={12}>
                  <Input
                    value={isSelf ? user.phone : undefined}
                    placeholder="Enter phone"
                    readOnly={isSelf}
                    required
                    size="large"
                  />
                </Col>

                <Col md={6} sm={12}>
                  <Input
                    value={
                      isSelf ? `${user.door_street}, ${user.place}` : undefined
                    }
                    placeholder="Enter door_no, place"
                    readOnly={isSelf}
                    required
                    size="large"
                  />
                </Col>

                <Col md={6} sm={12}>
                  <Input
                    value={isSelf ? user.city : undefined}
                    placeholder="Enter city"
                    readOnly={isSelf}
                    required
                    size="large"
                  />
                </Col>

                <Col md={6} sm={12}>
                  <Input
                    value={isSelf ? user.district : undefined}
                    placeholder="Enter district"
                    readOnly={isSelf}
                    required
                    size="large"
                  />
                </Col>
              </Row>
            </div>

            {/* Payment Method */}
            <Row className="mt-4 p-3 bg-light rounded justify-content-center text-center">
              <Col xs={12}>
                <h5 className="mb-3 fw-bold">Payment Method</h5>
                <Radio.Group
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  value={paymentMethod}
                  className="d-flex flex-wrap justify-content-center gap-3"
                  size="large"
                >
                  <Radio value="cod">Cash on Delivery</Radio>
                  <Radio value="upi">UPI</Radio>
                  <Radio value="card">Debit/Credit Card</Radio>
                </Radio.Group>
              </Col>
            </Row>

            {/* Payment Details */}
            <Row className="d-flex justify-content-center g-3 mt-3">
              {paymentMethod === "upi" && (
                <Col md={6} sm={12}>
                  <Input placeholder="Enter UPI ID" />
                </Col>
              )}
              {paymentMethod === "card" && (
                <>
                  <Col md={6} sm={12}>
                    <small className="mb-1 d-block">Card Number</small>
                    <Input placeholder="Enter Card Number" maxLength={16} />
                  </Col>

                  <Col md={4} sm={6}>
                    <small className="mb-1 d-block">Expiry Date</small>
                    <Input type="month" />
                  </Col>
                </>
              )}
            </Row>

            {/* Submit Button */}
            <div className="text-center mt-4">
              <Button
                htmlType="submit"
                type="primary"
                size="large"
                style={{ width: "100%" }}
              >
                {paymentMethod === "upi" || paymentMethod === "card"
                  ? `Pay ₹${getTotal()}`
                  : `Place Order & Pay later ₹${getTotal()}`}
              </Button>
            </div>
          </Form>
        </Container>
      </motion.div>

      <Greeting
        show={showGreeting}
        onClose={handleGreetingClose}
        user={user}
        paymentMethod={paymentMethod}
        myBill={getTotal()}
      />
    </BackgroundWrap>
  );
};

export default Billing;
