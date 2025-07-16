import {
  logOut,
  selectCurrentExpiry,
  selectCurrentRefreshToken,
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
  const refreshToken = useSelector(selectCurrentRefreshToken);
  const expiresAt = useSelector(selectCurrentExpiry);
  const verifiedUser = useSelector(selectVerifiedUser);
  const currentPath = location.pathname;
  const dispatch = useDispatch();

  useEffect(() => {
    if (
      !token ||
      !expiresAt ||
      (token && expiresAt && !refreshToken && expiresAt < Date.now())
    ) {
      dispatch(logOut());
    }
  }, [token, expiresAt, dispatch, refreshToken]);

  if (!token || !expiresAt) {
    return <Navigate to="/" replace state={{ from: location }} />;
  }

  if (token && expiresAt && !refreshToken && expiresAt < Date.now()) {
    return <Navigate to="/" replace state={{ from: location }} />;
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
