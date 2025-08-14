import React, { useState, useEffect } from "react";
import { Card, Row, Col, Container } from "react-bootstrap";
import { Button } from "antd";
import products from "../../data/grocery.json";
import { Image } from "antd";
import { motion } from "framer-motion";
import TypeSearch from "../../utils/typeSearch";
import ProductCard from "../../utils/productCard";
import { useCart } from "../../context/cartContext";
import { fixImagePaths } from "../../utils/fixImagePaths";

const Bakery = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [myCart, setMyCart] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    if (products.length > 0) {
      const bakery = products[0].bakery;
      const fixed = fixImagePaths(bakery);
      setData(fixed);
      setSearchData(data);
    }
  }, []);

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4} sm={10}>
          <h4 className="mb-0">Baked Fresh, Just for You</h4>
        </Col>
        <Col sm={12} xs={12} md={6} className="ms-md-auto">
          <TypeSearch
            data={data}
            fields={["name"]}
            onFilter={setSearchData}
            placeholder="Search Your Favourite Baked Items"
          />
        </Col>
      </Row>

      <Row className="justify-content-center mt-5">
        {searchData.map((fruit, index) => (
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
    </Container>
  );
};

export default Bakery;
