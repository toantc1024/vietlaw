import React from "react";
import { HiSearch, HiSearchCircle, HiSparkles } from "react-icons/hi";

const SearchBar = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <form
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
        }}
      >
        <div class="relative text-gray-600">
          <span class="absolute inset-y-0 left-0 my-auto mx-2 w-[40px] h-[40px] hover:bg-slate-300 focus:outline-none rounded-full flex items-center justify-center transition-all ease-in-out duration-200">
            <button class="p-1">
              <HiSearch className="text-2xl" />
            </button>
          </span>
          <input
            type="search"
            name="q"
            class="py-2 text-sm h-[50px] text-gray-400 w-[800px] px-4 rounded-full pl-14 pr-14 outline-none  focus:text-gray-900 bg-slate-200 border-[1px] border-slate-200  focus:bg-white transition-all ease-in-out duration-300"
            placeholder="Search..."
            autocomplete="off"
          />
          <span class="absolute inset-y-0 right-0 my-auto mx-2 w-[40px] h-[40px] hover:bg-red-400 rounded-full flex items-center justify-center">
            <button class="p-1">
              <HiSparkles />
            </button>
          </span>
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
