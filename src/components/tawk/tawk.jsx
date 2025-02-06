import { useEffect } from "react";
import { useSelector } from "react-redux"; // For Redux state
import { useLocation } from "react-router-dom"; 
import { checkAuth } from "../../store/auth-slice";


const TawkTo = () => {
    const { user } = checkAuth(); // Assuming checkAuth() returns an object with user data
    const location = useLocation();

  // Don't render Tawk on login or register pages
  if (location.pathname === "/login" || location.pathname === "/register") {
    return null;
  }

  useEffect(() => {
    // Only load the Tawk script if user is authenticated
    if (!user?.email) return;

    const script = document.createElement("script");
    script.src = "https://embed.tawk.to/67a23d823a8427326079a65a/default";
    script.async = true;
    script.charset = "UTF-8";
    script.setAttribute("crossorigin", "*");

    document.body.appendChild(script);

    script.onload = () => {
      if (window.Tawk_API && user?.email) {
        window.Tawk_API.onLoad = function () {
          window.Tawk_API.setAttributes(
            {
              name: user?.userName || "Guest", // Use userName or fallback to "Guest"
              email: user?.email,
              userId: user?._id, // Using _id as a unique identifier
            },
            function (error) {
              if (error) {
                console.log("Tawk API Error:", error);
              }
            }
          );
        };
      }
    };

    return () => {
      document.body.removeChild(script);
    };
  }, [user, location]); // Runs when user or route changes

  return null;
};

export default TawkTo;
