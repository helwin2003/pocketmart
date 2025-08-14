import React from "react";
import { Button, Empty } from "antd";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/cartContext";
import { Row, Col } from "react-bootstrap";

const Cart = ({ onClose }) => {
  const { cart, updateQuantity, getTotal } = useCart();
  const navigate = useNavigate();

  const handleShop = () => {
    navigate("/home");
    if (onClose) onClose();
  };

  const handleCheckout = () => {
    alert("Proceeding to billing...");
    onClose();
    navigate("/billing");
  };

  return cart.length > 0 ? (
    <div>
      {cart.map((item, index) => (
        <Row className="mt-2">
          <Col md={3} sm={3} xs={3}>
            <img
              src={item.image}
              alt={item.name}
              style={{ width: 60, height: 60, objectFit: "cover" }}
            />
          </Col>
          <Col md={4} sm={4} xs={4}>
            <strong>{item.name}</strong> <br />
            <Button size="small" onClick={() => updateQuantity(item.name, -1)}>
              -
            </Button>
            <span className="mx-2">{item.quantity}</span>
            <Button size="small" onClick={() => updateQuantity(item.name, 1)}>
              +
            </Button>
          </Col>
          <Col md={5} sm={5} xs={5}>
            <p style={{ textAlign: "justify" }}>
              ₹{item.price} x {item.quantity} ={" "}
              <b>₹{item.price * item.quantity}</b>
            </p>
          </Col>
        </Row>
      ))}
      <hr />
      <div className="text-end">
        <h5>Total: ₹{getTotal()}</h5>
        <Button
          type="primary"
          block
          onClick={handleCheckout}
          className="bg-dark"
        >
          Proceed to Bill
        </Button>
      </div>
    </div>
  ) : (
    <div style={{ textAlign: "center", padding: "50px 0" }}>
      <Empty description="Your cart is empty" />
      <Button type="default" onClick={handleShop}>
        Enter to Shop
      </Button>
    </div>
  );
};

export default Cart;
