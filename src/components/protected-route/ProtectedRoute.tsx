import {
  logOut,
  selectCurrentExpiry,
  selectCurrentToken,
  selectVerifiedUser,
} from "@/features/auth/auth.slice";
import { VERIFICATION_ROUTES } from "@/lib/constant";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const expiresAt = useSelector(selectCurrentExpiry);
  const verifiedUser = useSelector(selectVerifiedUser);
  const currentPath = location.pathname;
  const dispatch = useDispatch();
  useEffect(() => {
    if (
      !token ||
      !expiresAt ||
      (token && expiresAt && expiresAt < Date.now())
    ) {
      dispatch(logOut());
    }
  }, [token, expiresAt, dispatch]);

  if (!token || !expiresAt || (token && expiresAt && expiresAt < Date.now())) {
    return <Navigate to="/register" replace state={{ from: location }} />;
  }

  if (!verifiedUser) {
    if (VERIFICATION_ROUTES.includes(currentPath)) {
      return <Outlet />;
    }

    return (
      <Navigate to="/complete-profile" replace state={{ from: location }} />
    );
  }

  if (verifiedUser && VERIFICATION_ROUTES.includes(currentPath)) {
    return <Navigate to="/dashboard" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
