import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export const DashboardLayout = () => {
  return (
    <div className="dashboard_layout_layer min-h-screen h-300">
      <Navbar />
      <Outlet />
    </div>
  );
};
