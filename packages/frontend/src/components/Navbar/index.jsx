import React from "react";
import SearchBar from "../ui/SearchBar";
import Tools from "../Tools/index";
import Logo from "../Logo/index";

const Navbar = () => {
  return (
    <nav className="py-2 flex items-center justify-center">
      <Logo />
      <SearchBar />
      <Tools />
    </nav>
  );
};

export default Navbar;
