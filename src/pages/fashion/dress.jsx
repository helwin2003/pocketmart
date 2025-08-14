import React, { useState, useEffect, useContext } from "react";
import { Card, Row, Col, Container, Form } from "react-bootstrap";
import { Button } from "antd";
import products from "../../data/fashion.json";
import { Image } from "antd";
import { motion } from "framer-motion";
import TypeSearch from "../../utils/typeSearch";
import ProductCard from "../../utils/productCard";
import { useCart } from "../../context/cartContext";
import { fixImagePaths } from "../../utils/fixImagePaths";

const Dress = () => {
  const [data, setData] = useState([]);
  const [searchData, setSearchData] = useState([]);
  const [filter, setFilter] = useState("");
  const [myCart, setMyCart] = useState([]);

  const { addToCart } = useCart();

  useEffect(() => {
    if (products.length > 0) {
      const dress = products[0].dress;
      const fixed = fixImagePaths(dress);
      setData(fixed);
      setSearchData(dress);
    }
  }, []);

  useEffect(() => {
    if (filter) {
      const filtered = data.filter((item) => item.cloth === filter);
      setSearchData(filtered);
    } else {
      setSearchData(data);
    }
  }, [filter, data]);

  return (
    <Container className="mt-4">
      <div className="d-flex align-items-center gap-3 flex-wrap my-3">
        <h4 className="mb-0">Discover Your Perfect Dress</h4>

        <div style={{ width: "25%" }} className="text-end">
          <Form.Select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value="">Select Cloth</option>
            {[...new Set(data.map((clo) => clo.cloth))].map((cloth) => (
              <option key={cloth} value={cloth}>
                {cloth}
              </option>
            ))}
          </Form.Select>
        </div>
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
  );
};

export default Dress;
