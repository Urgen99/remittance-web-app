import { selectCurrentToken } from "@/features/auth/auth.slice";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, Outlet, useNavigate } from "react-router-dom";

const ProtectedRoute = () => {
  const navigate = useNavigate();
  const token = useSelector(selectCurrentToken);
  const isAuthChecking = typeof token === "undefined";

  useEffect(() => {
    if (!isAuthChecking && !token) {
      navigate("/register", { replace: true });
    }
  }, [token, isAuthChecking, navigate]);

  if (isAuthChecking) {
    return (
      <section className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </section>
    );
  }

  return token ? <Outlet /> : <Navigate to="/" replace />;
};

export default ProtectedRoute;
