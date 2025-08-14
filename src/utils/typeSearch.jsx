/**
 * Reusable component created by @HelwinRajadurai
 * This component used to search the data from the component
 *
 * Note: This is client side Searching not for server side Searching
 *
 */

import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import { SearchOutlined } from "@ant-design/icons";

const TypeSearch = ({
  data,
  fields = [],
  onFilter,
  placeholder = "Search...",
}) => {
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const lowercasedSearch = searchText.toLowerCase();
    const filtered = data.filter((item) =>
      fields.some((field) => {
        const value = item[field];
        return (
          value && value.toString().toLowerCase().includes(lowercasedSearch)
        );
      })
    );
    onFilter(filtered);
  }, [searchText, data]);

  return (
    <div className="input-group input-group-sm">
      <span className="input-group-text">
        <SearchOutlined style={{ fontSize: "18px", color: "#000" }} />
      </span>
      <Form.Control
        type="search"
        value={searchText}
        placeholder={placeholder}
        onChange={(e) => setSearchText(e.target.value)}
      />
    </div>
  );
};

export default TypeSearch;
