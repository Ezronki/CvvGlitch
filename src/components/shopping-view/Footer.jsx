import React from "react";
import CryptoTicker from "../../components/shopping-view/CryptoTicker";

const Footer = () => {
  return (
    <footer className="fixed bottom-0 left-0 w-full bg-black text-white text-center py-2 z-20">
      <CryptoTicker />
    </footer>
  );
};

export default Footer;
