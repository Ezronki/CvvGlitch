import React, { useEffect } from 'react';

const TawkTo = () => {
  useEffect(() => {
    // Dynamically add the Tawk.to script to the document
    const script = document.createElement('script');
    script.src = 'https://embed.tawk.to/67adeeff825083258e149cc2/default';
    script.async = true;
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    document.body.appendChild(script);

    // Cleanup function to remove the script when the component unmounts
    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default TawkTo;
