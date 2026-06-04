import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export const DashboardLayout = () => {
  return (
    <div className="dashboard_layout_layer min-h-screen flex-row">
      <div className="Header_layout fixed w-full z-20 pt-4">
        <Navbar />
      </div>
      <div className="Outlet_layout pt-20">
        <Outlet />
      </div>
    </div>
  );
};
