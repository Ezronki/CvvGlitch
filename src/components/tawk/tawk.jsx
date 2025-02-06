import { useEffect } from "react";
import { useLocation } from "react-router-dom";

function TawkTo() {
  const location = useLocation();

  useEffect(() => {
    // Initialize Tidio script
    const script = document.createElement("script");
    script.src = "//code.tidio.co/jxz29aflxc3rzxvtw9dzlw2xwdfcquzu.js";
    script.async = true;
    document.body.appendChild(script);

    // Track page changes
    if (window.tidioChatApi) {
      window.tidioChatApi.setAttributes({ currentPage: location.pathname }, function (error) {
        if (error) console.error("Tidio tracking error:", error);
      });
    }

    return () => {
      document.body.removeChild(script);
    };
  }, [location.pathname]);

  return null;
}

export default TawkTo;
