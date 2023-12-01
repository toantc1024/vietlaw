import React from "react";
import Navbar from "../../components/Navbar";
import { HiDocument, HiSearch, HiSparkles } from "react-icons/hi";
import { Routes, Route, Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Home = () => {
  return (
    <div className="h-full w-full bg-slate-50 flex">
      <div className="bg-slate-100 h-full flex flex-col gap-4 items-center justify-start px-1 py-4">
        <Link
          to="/search"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-[50px] h-[40px] rounded-full flex items-center justify-center">
            <HiSearch className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Search</span>
        </Link>

        <Link
          to="/chatbot"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-[50px] h-[40px] rounded-full flex items-center justify-center">
            <HiSparkles className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Chatbot</span>
        </Link>

        <Link
          to="/analyze"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-[50px] h-[40px] rounded-full flex items-center justify-center">
            <HiDocument className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Analyze</span>
        </Link>
      </div>
      <div className="h-screen w-full">
        <Routes>
          <Route
            path="login"
            element={
              <div className="h-full w-full bg-blue-400 text-8xl">Login!</div>
            }
          />
          <Route
            path="search"
            element={
              <div className="h-full w-full bg-red-400 text-8xl">Search!</div>
            }
          />
          <Route
            path="chatbot"
            element={
              <div className="h-full w-full bg-green-400 text-8xl">
                Chatbot!
              </div>
            }
          />
          <Route path="search" element={<div>Hello!</div>} />
        </Routes>
        {/* <Navbar />
        <div className="h-full w-full bg-slate-50 p-4 ">
          <div className="relative h-full w-full bg-blue-100 rounded-xl flex flex-col">
            <div className="absolute p-4 flex gap-2 bottom-0 right-0">
              <button className="bg-white p-2 rounded-lg text-blue-600 bg-slate-200">
                Search
              </button>
              <button className="bg-white p-2 rounded-lg text-blue-600 `">
                Helper
              </button>
            </div>
          </div>
        </div> */}
        {/* Tools bars */}
      </div>
    </div>
  );
};

export default Home;
