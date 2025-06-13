import {
  logOut,
  selectCurrentExpiry,
  selectCurrentToken,
} from "@/features/auth/auth.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const location = useLocation();
  const token = useSelector(selectCurrentToken);
  const expiresAt = useSelector(selectCurrentExpiry);
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
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
