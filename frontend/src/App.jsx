// import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AddNewPost, Authorization, Registration } from "./pages";
import { Navbar } from "./components";

function App() {
  // const [count, setCount] = useState(0);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/addNewPost" element={<AddNewPost />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
