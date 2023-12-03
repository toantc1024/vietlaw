import React from "react";
import SearchBar from "../ui/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi";

const Header = ({ showSearchBar }) => {
  const location = useLocation();

  return (
    <div className="text-2xl p-2 py-4 rounded-lg flex justify-between relative">
      <Link
        to="/"
        className=" px-4 h-[50px] hover:bg-white border-[1px] cursor-pointer rounded-full flex items-center justify-center text-2xl"
      >
        <span className="text-blue-400">Vie</span>
        <span className="text-gray-600">Law</span>
      </Link>

      {location && location.pathname.split("/").includes("search") && (
        <SearchBar />
      )}

      <div className="absolute  right-0 flex items-center justify-center px-4">
        <Link
          to="/login"
          className="w-[50px] h-[50px] bg-teal-400 rounded-full flex items-center justify-center text-xl"
        >
          <span>
            <HiUser />
          </span>
        </Link>
      </div>
    </div>
  );
};

export default Header;
