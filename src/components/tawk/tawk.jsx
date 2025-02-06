import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";

const TawkTo = () => {
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // Don't render Tawk on specific routes
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  useEffect(() => {
    let isMounted = true;

    // Initialize Tawk only once
    if (!window.Tawk_API) {
      const script = document.createElement("script");
      script.src = "https://embed.tawk.to/67a23d823a8427326079a65a/default";
      script.async = true;
      script.charset = "UTF-8";
      script.setAttribute("crossorigin", "*");

      // Set up API hooks before script loads
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = () => {
        console.log("Tawk.to script loaded");
        if (isMounted && user?.email) {
          setTimeout(() => {
            updateTawkUser(user);
          }, 3000); // Delay of 3 seconds
        }
      };

      document.body.appendChild(script);
    }

    // Update user if script is already loaded
    if (window.Tawk_API && window.Tawk_API.setAttributes && user?.email) {
      setTimeout(() => {
        updateTawkUser(user);
      }, 3000); // Delay of 3 seconds
    }

    return () => {
      isMounted = false;
    };
  }, [user]); // Only react to user changes

  const updateTawkUser = (currentUser) => {
    window.Tawk_API.setAttributes(
      {
        name: currentUser?.userName || "Guest",
        email: currentUser?.email,
        userId: currentUser?._id,
      },
      (error) => {
        if (error) console.error("Tawk.to attribute error:", error);
      }
    );
  };

  return null;
};

export default TawkTo;
