import { Outlet } from "react-router-dom";
import { Container } from "@mui/material";

export const AuthLayout = () => {
  return (
    <div className="auth_layout_layer flex justify-center items-center h-screen">
      <Outlet />
    </div>
  );
};
