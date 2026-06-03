import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";
import Navbar from "../Navbar";

export const DashboardLayout = () => {
  return (
    <div>
      <Navbar />
      <Outlet />
    </div>
  );
};
