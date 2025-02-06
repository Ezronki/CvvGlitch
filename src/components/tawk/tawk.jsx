import React, { useEffect } from 'react';

const TidioChat = () => {
  useEffect(() => {
    // Dynamically add the Tidio script to the document
    const script = document.createElement('script');
    script.src = '//code.tidio.co/jxz29aflxc3rzxvtw9dzlw2xwdfcquzu.js';
    script.async = true;
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TidioChat;
