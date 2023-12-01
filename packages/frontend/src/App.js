import React, { Fragment } from "react";
import Home from "./pages/Home";
import { Counter } from "./features/counter/Counter";
const App = () => {
  return (
    <Fragment>
      <Home />
      <Counter />
    </Fragment>
  );
};

export default App;
