import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <div className="h-full w-full flex flex-col gap-12 items-center justify-center text-4xl bg-blue-500 text-white">
      <span className="font-bold">{"Trang này bị cá mập cắn rồi :<"}</span>
      <Link className="bg-blue-600 p-4 rounded-xl hover:ring-4" to="/">
        Về trang chủ
      </Link>
    </div>
  );
};

export default NotFound;
