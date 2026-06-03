import { BrowserRouter, Routes, Route } from "react-router-dom";
import { DashboardLayout } from "./components/Layouts/DashboardLayout";
import { AuthLayout } from "./components/Layouts/AuthLayout";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";

function APP() {
  return (
    <BrowserRouter>
      <div className="layer_1_browserRouter min-h-screen flex flex-col">
        <div className="layer_2_browserRouter flex-1 flex flex-col">
          <Routes>
            <Route element={<AuthLayout />}>
              <Route path="/Login" element={<Login />} />
              <Route path="/Register" element={<Register />} />
            </Route>
            <Route element={<DashboardLayout />}>
              <Route path="/" element={<Dashboard />} />
            </Route>
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default APP;
