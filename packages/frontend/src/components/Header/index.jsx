import React from "react";
import SearchBar from "../ui/SearchBar";
import { Link, useLocation } from "react-router-dom";
import { HiUser } from "react-icons/hi";
import { useUserStore } from "../../app/store";

const Header = ({ showSearchBar }) => {
  const location = useLocation();
  const [showAccount, setShowAccount] = React.useState(false);

  const { user, logout } = useUserStore();
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

      {!(user && user.token) ? (
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
      ) : (
        <div className="absolute  right-0 flex items-center justify-center px-4">
          <div
            className="relative cursor-pointer w-[50px] text-white h-[50px] bg-sky-900 rounded-full active:ring-2 flex items-center justify-center text-xl"
            onClick={() => {
              setShowAccount(!showAccount);
            }}
          >
            <span>Ad</span>
            {showAccount && (
              <div
                className="absolute w-auto hover:bg-slate-100 shadow-sm bg-white rounded-xl border-[1px] bottom-[-60px] right-0 px-4 flex items-center justify-center py-2 text-gray-600 fadeIn"
                onClick={() => {
                  localStorage.removeItem("user");
                  logout();
                  window.location.href = "/";
                }}
              >
                Logout
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
