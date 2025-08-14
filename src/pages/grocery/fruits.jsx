import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Button } from "antd";
import products from "../../data/grocery.json";
import { Image } from "antd";
import { motion } from "framer-motion";
import TypeSearch from "../../utils/typeSearch";
import ProductCard from "../../utils/productCard";
import { useCart } from "../../context/cartContext";
import BackgroundWrap from "../../utils/backgroundWrapper";
import { FruitBg } from "../../assets";
import Footer from "../../components/footer";
import { fixImagePaths } from "../../utils/fixImagePaths";

const Fruits = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [myCart, setMyCart] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    if (products.length > 0) {
      const fruits = products[0].fruits.map((item) => ({
        ...item,
        category: "fruits",
      }));
      const vegetables = products[0].vegetables.map((item) => ({
        ...item,
        category: "vegetables",
      }));

      const fixed = fixImagePaths([...fruits, ...vegetables]);
      setData(fixed);
      setSearchData(data);
    }
  }, []);

  return (
    <BackgroundWrap backgroundImage={FruitBg} opacity={0.2}>
      <Container className="mt-4">
        <Row>
          <Col md={4} sm={10}>
            <h4 className="mb-0">Fresh Picks: Fruits & Vegetables</h4>
          </Col>
          <Col sm={12} xs={12} md={6} className="ms-md-auto">
            <TypeSearch
              data={data}
              fields={["name"]}
              onFilter={setSearchData}
              placeholder="Search by Fruits, Vegetables"
            />
          </Col>
        </Row>

        <Row className="justify-content-center">
          <h2 className="text-center">Fruits</h2>
          {searchData
            .filter((item) => item.category === "fruits")
            .map((fruit, index) => (
              <Col
                md={6}
                lg={4}
                sm={6}
                xs={10}
                key={index}
                className="mb-4 d-flex justify-content-center"
              >
                <ProductCard
                  image={fruit.image}
                  name={fruit.name}
                  quantity={fruit.quantity}
                  price={fruit.price}
                  type={fruit.type}
                >
                  <Button
                    type="default"
                    className="w-50"
                    onClick={() =>
                      addToCart({
                        name: fruit.name,
                        price: fruit.price,
                        image: fruit.image,
                        quantity: 1,
                      })
                    }
                  >
                    Add
                  </Button>
                </ProductCard>
              </Col>
            ))}
        </Row>

        <Row className="justify-content-center">
          <h2 className="text-center">Vegetables</h2>
          {searchData
            .filter((item) => item.category === "vegetables")
            .map((veg, index) => (
              <Col
                md={4}
                lg={4}
                sm={6}
                xs={10}
                key={index}
                className="mb-4 d-flex justify-content-center"
              >
                <ProductCard
                  image={veg.image}
                  name={veg.name}
                  quantity={veg.quantity}
                  price={veg.price}
                  type={veg.type}
                >
                  <Button
                    type="default"
                    className="w-50"
                    onClick={() =>
                      addToCart({
                        name: veg.name,
                        price: veg.price,
                        image: veg.image,
                        quantity: 1,
                      })
                    }
                  >
                    Add
                  </Button>
                </ProductCard>
              </Col>
            ))}
        </Row>
      </Container>
      <Footer />
    </BackgroundWrap>
  );
};

export default Fruits;
