import React from "react";
import { HiDocument, HiSearch, HiSparkles } from "react-icons/hi";
import { Routes, Route, Link, Router, Outlet } from "react-router-dom";
import Header from "../../components/Header";
const Home = () => {
  return (
    <div className="h-screen w-full bg-slate-50 flex">
      <div className="bg-slate-100 h-full flex flex-col gap-4 items-center justify-start px-1 py-4 w-[100px]">
        <Link
          to="./search"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-full  h-[40px] rounded-full flex items-center justify-center">
            <HiSearch className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Pháp điển</span>
        </Link>

        <Link
          to="./chatbot"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-full  h-[40px] rounded-full flex items-center justify-center">
            <HiSparkles className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Lawyer</span>
        </Link>

        <Link
          to="./analyze"
          className="group cursor-pointer  flex flex-col items-center justify-center px-2"
        >
          <div className=" group-hover:bg-blue-100 text-gray-600 w-full h-[40px] rounded-full flex items-center justify-center">
            <HiDocument className="text-2xl" />
          </div>
          <span className="text-gray-600 text-sm">Phân tích</span>
        </Link>
      </div>

      <div className="h-full w-full flex flex-col">
        <Header showSearchBar={true} />
        <Outlet />
      </div>
    </div>
  );
};

export default Home;
