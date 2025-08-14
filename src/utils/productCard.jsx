import React from "react";
import { Card } from "react-bootstrap";
import { Image } from "antd";
import { motion } from "framer-motion";

const ProductCard = ({ image, name, quantity, price, type, children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      whileHover={{ scale: 1.05 }}
      //   transition={{ type: "spring", stiffness: 300 }}
      className="w-100"
    >
      <Card className="shadow text-center h-100">
        {image && (
          <div className="d-flex justify-content-center">
            <Image
              src={image}
              alt={name}
              style={{
                height: "200px",
                width: "220px",
                objectFit: "cover",
              }}
              className="my-3"
            />
          </div>
        )}
        <Card.Body>
          <Card.Title>{name}</Card.Title>
          <Card.Text>
            {/* <strong>Quantity:</strong> {quantity} {type ? `- ${type}` : ""} */}
            <br />
            <strong>Price:</strong> ₹{price} / {type}
          </Card.Text>

          {children}
        </Card.Body>
      </Card>
    </motion.div>
  );
};

export default ProductCard;
