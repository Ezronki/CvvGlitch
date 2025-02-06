import React, { useEffect } from 'react';
import { checkAuth } from "../../store/auth-slice"

const TawkTo = () => {
  const { user } = checkAuth(); // Get logged-in user from context/state

  useEffect(() => {
    // Initialize Tawk.to script
    if (!window.Tawk_API) {
      const script = document.createElement('script');
      script.async = true;
      script.src = 'https://embed.tawk.to/67a23d823a8427326079a65a/default';
      script.charset = 'UTF-8';
      script.setAttribute('crossorigin', '*');
      document.body.appendChild(script);

      // Define Tawk_API.onLoad callback
      window.Tawk_API = window.Tawk_API || {};
      window.Tawk_API.onLoad = () => {
        updateTawkUser(user); // Update on initial load if user exists
      };
    }
  }, []);

  useEffect(() => {
    // Update user info when auth state changes
    updateTawkUser(user);
  }, [user]);

  const updateTawkUser = (currentUser) => {
    if (window.Tawk_API && window.Tawk_API.setAttributes) {
      if (currentUser?.email) {
        // Set visitor attributes
        window.Tawk_API.setAttributes({
          'email': currentUser.email,
          'name': currentUser.userName // Optional
        }, (error) => {});
      } else {
        // Optional: Reset attributes on logout
        window.Tawk_API.setAttributes({}, () => {});
      }
    }
  };

  return null; // Component doesn't render anything
};

export default TawkTo;
