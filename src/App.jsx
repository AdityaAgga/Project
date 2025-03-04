import React from "react";
import Home from "./pages/Home";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Header from "./components/Header";
import Footer from "./components/Footer";
import SignIn from "./components/SignIn";
import About from "./components/About";
import HowItWorksBrief from "./components/HowItWorksBrief";
import Pricing from "./components/Pricing";
import Mainpage from "./components/MainPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/how-it-works" element={<HowItWorksBrief />} />
          <Route path="/pricing" element={<Pricing />} /> 
          <Route path="/register" element={<Register />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/dashboard" element={<Mainpage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
