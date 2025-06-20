import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Hook to scroll to the top of the page smoothly
 * @example
 * useScrollToTop();
 */

const useScrollToTop = () => {
  const { hash, pathname } = useLocation();
  useEffect(() => {
    const timer = setTimeout(() => {
      if (hash) {
        const elem = document.querySelector(hash);

        if (elem) {
          elem.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      } else {
        window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      }
    }, 50);

    return () => clearTimeout(timer);
  }, [hash, pathname]);
};
export default useScrollToTop;
