import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { Button } from "antd";
import products from "../../data/fashion.json";
import { Image } from "antd";
import { motion } from "framer-motion";
import TypeSearch from "../../utils/typeSearch";
import ProductCard from "../../utils/productCard";
import { useCart } from "../../context/cartContext";
import { FashionBg } from "../../assets";
import BackgroundWrap from "../../utils/backgroundWrapper";
import { fixImagePaths } from "../../utils/fixImagePaths";

const Accessories = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [filter, setFilter] = useState("");
  const [myCart, setMyCart] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    if (products.length > 0) {
      const accessories = products[0].accessories;
      const fixed = fixImagePaths(accessories);
      setData(fixed);
      setSearchData(data);
    }
    console.log(data);
  }, []);

  return (
    <BackgroundWrap backgroundImage={FashionBg} opacity={0.2}>
      <Container className="mt-4">
        <div className="d-flex align-items-center gap-3 flex-wrap my-3">
          <h4 className="mb-0">Pick your Wearables</h4>
          <div style={{ width: "25%" }} className="text-end"></div>
          <Col sm={12} xs={12} md={6} className="ms-md-auto">
            <TypeSearch
              data={data}
              fields={["name"]}
              onFilter={setSearchData}
            />
          </Col>
        </div>

        <Row className="justify-content-center">
          {searchData.map((dress, index) => (
            <Col
              md={6}
              lg={4}
              sm={6}
              xs={10}
              key={index}
              className="mb-4 d-flex justify-content-center"
            >
              <ProductCard
                image={dress.image}
                name={dress.name}
                quantity={dress.available}
                price={dress.price}
                type={dress.type}
              >
                <Button
                  type="default"
                  className="w-50"
                  onClick={() =>
                    addToCart({
                      name: dress.name,
                      price: dress.price,
                      image: dress.image,
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
    </BackgroundWrap>
  );
};

export default Accessories;
