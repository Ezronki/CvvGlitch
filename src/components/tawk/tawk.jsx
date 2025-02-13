import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';

const TawkTo = () => {
  const location = useLocation();
  const user = useSelector((state) => state.auth.user); // Assuming user info is stored in Redux

  useEffect(() => {
    // Function to add the Tawk.to script
    const addTawkToScript = () => {
      const script = document.createElement('script');
      script.src = 'https://embed.tawk.to/67adeeff825083258e149cc2/default';
      script.async = true;
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);
      
      script.onload = () => {
        if (window.Tawk_API) {
          window.Tawk_API.onLoad = function () {
            // Set user attributes if user is logged in
            if (user) {
              window.Tawk_API.setAttributes({
                name: user.userName,
                email: user.email,
              }, function(error) {
                if (error) console.error('Tawk.to user setup error:', error);
              });
            }
            
            // Track full page URL changes
            window.Tawk_API.addEvent('page_view', {
              url: window.location.href,
              title: document.title,
            }, function(error) {
              if (error) console.error('Tawk.to page tracking error:', error);
            });
          };
        }
      };
    };

    // Remove existing script if any
    const removeTawkToScript = () => {
      const existingScript = document.querySelector('script[src="https://embed.tawk.to/67adeeff825083258e149cc2/default"]');
      if (existingScript) {
        document.body.removeChild(existingScript);
      }
    };

    removeTawkToScript(); // Ensure no duplicate scripts
    addTawkToScript();
  }, [location.pathname, user]); // Re-run when the route or user info changes

  return null; // This component doesn't render anything
};

export default TawkTo;
