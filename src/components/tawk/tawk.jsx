import { useEffect } from "react";

function TawkTo() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "//code.tidio.co/jxz29aflxc3rzxvtw9dzlw2xwdfcquzu.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  return null;
}

export default TawkTo;
