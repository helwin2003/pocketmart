import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const date = new Date();
  const year = date.getFullYear();

  const url = "https://in.linkedin.com/in/helwinrajadurai";

  return (
    <div className="w-100 bg-light text-center text-secondary py-3">
      © {year}{" "}
      <Link to={url} target="_blank">
        Helwin {""}
      </Link>
      All rights reserved.
    </div>
  );
};

export default Footer;
