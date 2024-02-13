import React from "react";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div>
      <h1>Hello World</h1>
      <Outlet />
    </div>
  );
}
