import { useAuth } from "@/router/AuthContext";
import { useNavigate } from "react-router-dom";

export const useLogout = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const logoutUser = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return { logoutUser };
};