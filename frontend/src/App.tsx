import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";

function APP() {
  return (
    <BrowserRouter>
      <div className="layer_1_browserRouter min-h-screen flex flex-col">
        {/* <Navbar /> */}
        <div className="layer_2_browserRouter flex-1 flex flex-col">
          <Routes>
            <Route
              path="/"
              element={
                <div className="container mx-auto p-4">
                  <h1 className="text-2xl font-bold">
                    Dashboard (coming Soon){" "}
                  </h1>
                </div>
              }
            />
             <Route path="/Login" element={<Login />} />
            <Route path="/Register" element={<Register />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default APP;
