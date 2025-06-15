import {
  selectCurrentExpiry,
  selectCurrentUser,
} from "@/features/auth/auth.slice";
import { PUBLIC_ROUTES } from "@/lib/constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

const useAuthState = () => {
  const token = useSelector(selectCurrentUser);
  const expiresAt = useSelector(selectCurrentExpiry);
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname;
  useEffect(() => {
    //  do not allow public routes to be accessed when user is logged in redirect to dashboard
    if (
      token &&
      expiresAt &&
      expiresAt > Date.now() &&
      !PUBLIC_ROUTES.includes(currentPath)
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, expiresAt, currentPath, navigate]);
};

export default useAuthState;
