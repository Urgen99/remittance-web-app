import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

type UseRouteGuardTypes = {
  primaryCondition: string | null | unknown;
  secondaryCondition?: string | null | unknown;
  navigateTo: string;
};

/** 
 * Hook to navigate back to a specified route when required conditions aren't met
 * 
 * @example 
 * Navigates to "/register" if email is not present
 * useNavigateBack({ check1: email, navigateTo: "/register" });
 * 
 * @example
 * Navigates to "/register" if email or password is not present
 * useNavigateBack({ check1: email, check2: password, navigateTo: "/register" });

*/
const useRouteGuard = (options: UseRouteGuardTypes): void => {
  const { primaryCondition, secondaryCondition, navigateTo } = options;
  const navigate = useNavigate();

  useEffect(() => {
    const isCheck1Valid = Boolean(primaryCondition);
    const isCheck2Valid =
      secondaryCondition === undefined ? true : Boolean(secondaryCondition);

    if (!isCheck1Valid || !isCheck2Valid) {
      navigate(navigateTo, { replace: true });
    }
  }, [primaryCondition, secondaryCondition, navigate, navigateTo]);
};

export default useRouteGuard;
