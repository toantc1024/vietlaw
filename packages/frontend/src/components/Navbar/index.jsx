import React from "react";
import SearchBar from "../ui/SearchBar";
import Tools from "../Tools/index";
import Header from "../Header/index";

const Navbar = () => {
  return (
    <nav className="py-2 flex items-center justify-center">
      <Header />
      <SearchBar />
      <Tools />
    </nav>
  );
};

export default Navbar;
