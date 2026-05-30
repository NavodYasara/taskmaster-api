import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";

function APP() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="container mx-auto p-4">
        <Routes>
          <Route
            path="/"
            element={
              <h1 className="text-2x1 font-bolt">Dashboard (coming Soon) </h1>
            }
          />
          <Route
            path="/login" 
            element={
              <h1 className="text-2x1 font-bolt">Login Page (Coming Soon)</h1>
            }
          />
          <Route
            path="/Register" 
            element={
              <h1 className="text-2x1 font-bolt">Register Page (Coming Soon)</h1>
            }
          />
        </Routes>
      </div>
    </BrowserRouter>
  );

}

export default APP
