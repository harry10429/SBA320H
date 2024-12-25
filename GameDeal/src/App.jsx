import { Route, Routes } from "react-router";
import Home from "./components/Home";
import Deals from "./components/Deals";
import Nav from "./components/Nav";
import "./App.css";

function App() {
  return (
    <>
      <Nav />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/deals" element={<Deals />} />
      </Routes>
    </>
  );
}

export default App;
