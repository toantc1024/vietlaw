import React, { useState } from "react";
import { HiSearch, HiSearchCircle, HiSparkles } from "react-icons/hi";
import { useSearchStore } from "../../app/store";

const SearchBar = () => {
  const { searchResult, setSearchResult } = useSearchStore();
  const [searchText, setSearchText] = useState("");

  const loadResult = async () => {
    const response = await fetch(
      `${process.env.REACT_APP_API_URL}/phapdien/search`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ query: searchText }),
      }
    );
    const data = await response.json();
    setSearchResult(data);
  };

  return (
    <div className="w-full flex items-center justify-center">
      <form
        method="GET"
        onSubmit={(e) => {
          e.preventDefault();
          loadResult();
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
            value={searchText}
            onKeyDown={(e) => {
              if (e.key === "Enter") loadResult();
            }}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            name="q"
            class="py-2 text-sm h-[50px] text-gray-400 w-[800px] px-4 rounded-full pl-14 pr-14 outline-none  focus:text-gray-900 bg-slate-200 border-[1px] border-slate-200  focus:bg-white transition-all ease-in-out duration-300"
            placeholder="Tìm kiếm chủ đề..."
            autocomplete="off"
          />
        </div>
      </form>
    </div>
  );
};

export default SearchBar;
