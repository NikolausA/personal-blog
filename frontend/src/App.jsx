import { Routes, Route } from "react-router-dom";
import "./App.css";
import { AddNewPost, Authorization, Main, Post, Registration } from "./pages";
import { Navbar } from "./components";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/post/:id" element={<Post />} />
        <Route path="/addNewPost" element={<AddNewPost />} />
        <Route path="/login" element={<Authorization />} />
        <Route path="/register" element={<Registration />} />
      </Routes>
    </>
  );
}

export default App;
