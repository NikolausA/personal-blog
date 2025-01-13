// import { useState } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import { Registration } from "./pages";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Link to={"/register"}>Register</Link>
      <Routes>
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
