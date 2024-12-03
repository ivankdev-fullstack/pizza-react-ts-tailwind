import React from "react";
import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";

const Header = () => {
  return (
    <header>
      <Link to="/">Fast React Piiza Co.</Link>
      <SearchOrder />
      <p>Ivan</p>
    </header>
  );
};

export default Header;
