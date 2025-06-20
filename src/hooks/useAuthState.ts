import {
  selectCurrentExpiry,
  selectCurrentUser,
} from "@/features/auth/auth.slice";
import { PUBLIC_ROUTES } from "@/lib/constant";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";

/**
 * Hook to navigate to /dashboard if user is logged in
 *
 * @example
 * If user tries to access public routes when they are logged in
 * Routes: /, /login, /create-password, /forgot-password, /verify-otp
 * Navigates to "/dashboard"
 */
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
      PUBLIC_ROUTES.includes(currentPath)
    ) {
      navigate("/dashboard", { replace: true });
    }
  }, [token, expiresAt, currentPath, navigate]);
};

export default useAuthState;
