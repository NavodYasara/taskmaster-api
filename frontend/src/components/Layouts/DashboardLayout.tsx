import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

export const DashboardLayout = () => {
  return (
    <div className="dashboard_layout_layer min-h-screen flex-row">
      <div className="Header_layout bg-green-200 fixed w-full z-20">
        <Navbar />
      </div>
      <div className="Outlet_layout flex-1 flex flex-col bg-amber-100 pt-20">
        <Outlet />
      </div>
    </div>
  );
};
