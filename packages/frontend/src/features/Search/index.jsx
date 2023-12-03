import React from "react";
const Search = () => {
  return (
    <div className="h-full w-full p-4 flex flex-col gap-2 overflow-hidden">
      <div className="text-xl text-blue-500">
        Have found 255 results in 0.2s
      </div>

      <div className="h-full w-full flex flex-col gap-2 overflow-auto">
        {[...new Array(100)].map((_, i) => {
          return (
            <div className="bg-blue-400 px-4 py-4 rounded-lg flex flex-col gap-4">
              <h1 className="text-4xl">Result</h1>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
                aliquam adipisci vero laborum temporibus maxime quisquam, dicta
                consequuntur fugiat dolore incidunt cupiditate vitae unde quas
                corporis architecto fugit explicabo debitis!
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Search;
