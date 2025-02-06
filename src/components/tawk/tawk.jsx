import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TawkTo() {
  const location = useLocation();

  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/jxz29aflxc3rzxvtw9dzlw2xwdfcquzu.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  useEffect(() => {
    const checkTidioAPI = () => {
      if (window.tidioChatApi) {
        window.tidioChatApi.setAttributes({ currentPage: location.pathname }, function (error) {
          if (error) console.error("Tidio tracking error:", error);
        });
      } else {
        // Retry after a short delay if the API is not available yet
        setTimeout(checkTidioAPI, 1000);
      }
    };

    checkTidioAPI();
  }, [location.pathname]);

  return null;
}

export default TawkTo;
