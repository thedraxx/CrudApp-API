import React from "react";
import { CrudApp } from "./Components/CrudApp";
import { CruddApi } from "./Components/CruddApi";

function App() {
  return (
    <>
      <h2>Ejercicios con React</h2>
      <CruddApi />
      <hr />
      <CrudApp />
    </>
  );
}

export default App;
