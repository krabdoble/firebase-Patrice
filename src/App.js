//import logo from "./logo.svg";
import React from "react";
import "./App.css";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import {Auth} from "./components/Auth";
import {Protected} from "./components/Protected";
import { useEffect } from "react";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth></Auth>}></Route>
        <Route
          path="/protected"
          element={
            <ProtectedRoute>
              <Protected></Protected>
            </ProtectedRoute>
          }
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

const ProtectedRoute = ({ redirectPath = "/", children }) => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("fireBaseToken");

    if (!token) {
      navigate(redirectPath);
    }
  }, [])

  return children
}

export default App;



