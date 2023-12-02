import React, { Fragment, useEffect, useState } from "react";

import Home from "./pages/Home";
import { Link, Route, Routes } from "react-router-dom";
import Search from "./features/Search";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import Chatbot from "./features/Chatbot";

const App = () => {
  const [token, setToken] = useState("");
  useEffect(() => {
    const token = localStorage.getItem("token");
    setToken(token);
  }, []);

  return (
    <Fragment>
      <Routes>
        <Route path="login" element={<Login />} />
        <Route
          path="/"
          element={
            <div className="w-full h-full flex items-center justify-center">
              Chào mừng cuộc thi Olympic phần mềm nguồn mở
              <Link
                className="text-blue-600 p-4 m-4 bg-red-500 text-white  rounded-lg hover:bg-red-600"
                to="/law"
              >
                /law
              </Link>
            </div>
          }
        />
        <Route path="/law" element={<Home />}>
          <Route path="search" element={<Search />} />
          <Route path="chatbot" element={<Chatbot token={token} />} />
          <Route
            path="analyze"
            element={
              <div className="h-full w-full bg-green-400 text-8xl">
                Document!
              </div>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Fragment>
  );
};

export default App;
