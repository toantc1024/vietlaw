import React from "react";
import { HiUser, HiUsers } from "react-icons/hi";

const Tools = () => {
  return (
    <div className="px-4">
      <div className="text-2xl p-3 px-8 py-2 rounded-lg">
        <div className="bg-white p-2 w-[50px] h-[50px] hover:bg-slate-200 border-[1px] cursor-pointer rounded-full flex items-center justify-center text-2xl">
          <HiUser />
        </div>
      </div>
    </div>
  );
};

export default Tools;
