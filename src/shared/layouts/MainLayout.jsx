import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Outlet } from "react-router-dom";
import "./Layout.css";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <div className="main-content">
        <main className="container">
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;
