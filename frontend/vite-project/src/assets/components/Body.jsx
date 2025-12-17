import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <nav style={{ padding: "10px", background: "#eee" }}>
      <NavLink to="/" style={{ marginRight: "10px" }}></NavLink>
      <NavLink to="/browse"></NavLink>
    </nav>
  );
};

export default Header;
