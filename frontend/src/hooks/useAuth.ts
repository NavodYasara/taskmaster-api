import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function useAuth() {
  const savedToken = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const [token, setToken] = useState(savedToken);

  useEffect(() => {
    !savedToken ? navigate("/login") : setToken(savedToken);
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("jwt");
    navigate("/login");
  };

  return { token, logout };
}
