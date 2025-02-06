import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TawkToPageTracker() {
  const location = useLocation();

  useEffect(() => {
    if (window.Tawk_API) {
      window.Tawk_API.setAttributes({ currentPage: location.pathname }, function (error) {
        if (error) {
          console.error("Tawk.to tracking error:", error);
        }
      });
    }
  }, [location.pathname]);

  return null;
}

export default TawkToPageTracker;
