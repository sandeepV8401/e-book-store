import React from "react";
import { Outlet } from "react-router-dom";
import "./Layout.css"

const PublicLayout = () => {
  return (
    <main className="container main-layout">
      <Outlet />
    </main>
  );
};

export default PublicLayout;
