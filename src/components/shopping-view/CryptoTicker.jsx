import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";

const CryptoTicker = () => {
  const [cryptos, setCryptos] = useState([]);
  const [error, setError] = useState(null);
  const location = useLocation();

  // Check if we are on the login or signup page
  const isAuthPage = location.pathname === "/auth/login" || location.pathname === "/auth/register" || location.pathname === "/admin/products" || location.pathname === "/shop/cart";
  ;

  useEffect(() => {
    if (isAuthPage) return; // Prevent API call on auth pages

    axios
      .get("https://api.coingecko.com/api/v3/coins/markets", {
        params: {
          vs_currency: "usd",
          ids: "bitcoin,ethereum,tether,solana,ripple,litecoin,cardano,polkadot,dogecoin,avax,monero,shiba-inu,chainlink,uniswap,stellar,tron,cosmos,ethereum-classic",
          order: "market_cap_desc",
        },
      })
      .then((response) => {
        setCryptos(response.data);
      })
      .catch(() => {
        setError("Failed to fetch crypto prices. Please try again later.");
      });
  }, [isAuthPage]); // Add isAuthPage as a dependency to prevent unnecessary re-renders

  if (isAuthPage) {
    return null; // Now safe to return since hooks were already executed
  }

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gradient-to-r from-gray-900 to-gray-800 text-white shadow-lg py-3">
      {cryptos.length > 0 ? (
        <div className="overflow-hidden whitespace-nowrap">
          <div className="inline-block animate-scroll">
            {cryptos.map((crypto) => (
              <div
                key={crypto.id}
                className="inline-flex items-center space-x-4 mx-8 p-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-all duration-300"
              >
                <img
                  src={crypto.image}
                  alt={crypto.name}
                  className="w-6 h-6 rounded-full"
                />
                <span className="font-medium">
                  {crypto.name} ({crypto.symbol.toUpperCase()}) - $
                  {crypto.current_price.toFixed(2)}
                </span>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="inline-flex items-center space-x-4 mx-8 p-2 bg-gray-800 rounded-lg">
          
        </div>
      )}

      <style>
        {`
          @keyframes scroll {
            0% { transform: translateX(0); }
            100% { transform: translateX(-50%); }
          }
          .animate-scroll {
            display: inline-block;
            white-space: nowrap;
            animation: scroll 100s linear infinite;
          }
        `}
      </style>
    </div>
  );
};

export default CryptoTicker;
