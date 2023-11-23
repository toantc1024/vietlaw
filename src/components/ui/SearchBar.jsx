import React from "react";
import { HiSearch } from "react-icons/hi";

const SearchBar = () => {
  return (
    <div className="w-full p-4 flex items-center justify-center">
      <div class="relative w-[200px] md:w-[400px] xl:w-[600px]">
        <div class="absolute inset-y-0 start-0 flex items-center justify-center ps-4 pointer-events-none ">
          <HiSearch />
        </div>
        <input
          type="search"
          class="block w-full py-4 px-2 ps-10 text-sm text-gray-900 border-[2px] border border-gray-300 rounded-3xl bg-gray-50 focus:ring-blue-500 focus:border-blue-500 outline-none"
          placeholder="Search Mockups, Logos..."
          alt="Tìm kiếm văn bản"
          required
        />
        <button class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 outline-none font-medium rounded-full text-sm px-4 py-2">
          Search
        </button>
      </div>
    </div>
  );
};

export default SearchBar;
