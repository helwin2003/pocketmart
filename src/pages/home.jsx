import React from "react";
import { Carousel, Button, Container, Row, Col } from "react-bootstrap";
import { motion } from "framer-motion";
import Shirt from "../assets/shirt.png";
import HomeAppl from "../assets/homeappliances.png";
import Grocery from "../assets/grocery.png";
import { useNavigate } from "react-router-dom";
import BackgroundWrap from "../utils/backgroundWrapper";
import { HomeBg } from "../assets";

const slides = [
  {
    title: "Stylish Shirts",
    description: "Upgrade your wardrobe with the latest trendy shirts.",
    image: Shirt,
    link: "/fashion/dress",
  },
  {
    title: "Fresh Grocery",
    description: "Get farm-fresh fruits and vegetables delivered fast.",
    image: Grocery,
    link: "/grocery/fruveg",
  },
];

const Home = () => {
  const navigate = useNavigate();
  return (
    <BackgroundWrap backgroundImage={HomeBg} opacity={0.2}>
      <Container fluid className="py-5">
        <Carousel controls={false} indicators={false} interval={1500}>
          {slides.map((slide, index) => (
            <Carousel.Item key={index}>
              <Row className="align-items-center px-5">
                <Col md={6} className="mb-4 mb-md-0">
                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                  >
                    <h1 style={{ fontWeight: "700", fontSize: "2.8rem" }}>
                      {slide.title}
                    </h1>
                  </motion.div>

                  <motion.div
                    initial={{ x: -50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.6 }}
                  >
                    <p style={{ fontSize: "1.2rem", color: "#555" }}>
                      {slide.description}
                    </p>
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9, duration: 0.5 }}
                  >
                    <Button
                      variant="primary"
                      onClick={() => navigate(slide.link)}
                    >
                      Explore
                    </Button>
                  </motion.div>
                </Col>

                {/* Right - Image Section */}
                <Col md={6}>
                  <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.7 }}
                  >
                    <img
                      src={slide.image}
                      alt={slide.title}
                      style={{
                        maxHeight: "420px",
                        width: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </motion.div>
                </Col>
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </BackgroundWrap>
  );
};

export default Home;
