import React from "react";
import SearchBar from "../ui/SearchBar";
import Tools from "../Tools/index";

const Navbar = () => {
  return (
    <nav className="py-6 bg-red-500 flex items-center justify-center">
      <SearchBar />
      <Tools />
    </nav>
  );
};

export default Navbar;
