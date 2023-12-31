import React, { Fragment, useEffect, useState } from "react";

import Home from "./pages/Home";
import { Link, Route, Routes } from "react-router-dom";
import Search from "./features/Search";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Chatbot from "./features/Chatbot";
import { usePhapDienStore, useUserStore } from "./app/store";
import Document from "./features/Document";

const App = () => {
  const { user, login, logout } = useUserStore();
  const { layDuLieu, phapDien } = usePhapDienStore();
  useEffect(() => {
    (async () => {
      const username = process.env.REACT_APP_DEMO_USERNAME;
      const password = process.env.REACT_APP_DEMO_PASSWORD;
      await login(username, password);
      // Check if phapDien is not an empty dict
      if (Object.keys(phapDien).length === 0) await layDuLieu();
    })();
  }, []);
  return (
    <Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <div className="h-screen w-full  flex flex-col">
              <div className="py-8 px-4 bg-blue-500 border-b-[1px]">
                <div className="flex  justify-between px-24 gap-24 items-center">
                  <div className="flex gap-4">
                    <Link to="/" className="hover:text-blue-600 text-white">
                      Trang chủ
                    </Link>
                    <Link
                      to="/law/search"
                      className="hover:text-blue-600 text-white"
                    >
                      Dùng thử
                    </Link>
                  </div>
                  <a
                    href="https://github.com/toantc1024/vietlaw"
                    target="_blank"
                    className="hover:text-blue-600 text-white"
                  >
                    Github
                  </a>
                </div>
              </div>

              <div className="bg-gradient-to-b from-sky-200 to-sky-100 h-full flex flex-col gap-12 items-center justify-center p-2">
                <div className="font-extrabold text-6xl flex text-gray-700 items-center justify-start gap-4">
                  <span className="bg-white p-6 shadow-sm rounded-full">
                    <span className="text-blue-500">Vie</span>
                    <span>Law</span>
                  </span>
                  <span>Pháp điển thông minh</span>
                </div>

                <div className="bg-white-400"></div>

                <div>
                  <Link
                    to="/law/search"
                    className="bg-blue-500 text-white p-4 rounded-lg hover:ring-4 hover:bg-blue-600 transition-all ease-in-out duration-150"
                  >
                    Thử ngay
                  </Link>
                </div>
              </div>
            </div>
          }
        />
        <Route path="/law" element={<Home />}>
          <Route exact path="search" element={<Search />} />
          <Route path="chatbot" element={<Chatbot />} />
          <Route path="analyze" element={<Document />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
