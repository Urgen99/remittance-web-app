import {
  logOut,
  selectIsAuthenticated,
  selectTokenExpiration,
} from "@/features/auth/auth.slice";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const useAuth = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const expiresAt = useSelector(selectTokenExpiration);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!expiresAt) return;

    const timeout = expiresAt - Date.now();

    if (timeout > 0) {
      const timer = setTimeout(() => {
        dispatch(logOut());
      }, timeout);

      return () => clearTimeout(timer);
    } else {
      dispatch(logOut());
    }
  }, [expiresAt, dispatch]);

  const logout = () => dispatch(logOut());

  return { isAuthenticated, logout };
};

export default useAuth;
