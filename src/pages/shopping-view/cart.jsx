import React from 'react'
import { useState } from 'react';
import Swal from 'sweetalert2';
import btc from "../../assets/crypto/btc.jpg";
import usdt from "../../assets/crypto/usdt.jpg";
import ltc from "../../assets/crypto/ltc.jpg";

const Checkout = () => {
    const [activeTab, setActiveTab] = useState(0);

    const tabs = [
        {
            title: 'DEPOSIT BITCOIN (BTC) ₿',
            address: '1G7VHkHiDLY28pqMNTPqjU7GVoce2tEXXS',
            qr: btc,
        },
        {
            title: 'DEPOSIT USDT-(TRC20) $',
            address: 'TLZVUDTxWZ6L7tgYXcQqtSx29EinwjRP2w',
            qr: usdt,
        },
        {
            title: 'DEPOSIT LITECOIN (LTC) Ł',
            address: 'LPXGUN35hc15X3SvouXVzWifLKifjNvqUn',
            qr: ltc,
        }
    ];

    const copyAddress = (address) => {
        navigator.clipboard.writeText(address)
            .then(() => Swal.fire('Copied!', 'Address copied to clipboard', 'success'))
            .catch(() => Swal.fire('Error', 'Failed to copy address', 'error'));
    };

    return (
        <div className="mt-14 max-w-full mx-auto p-4 md:p-6 bg-gray-900 text-white min-h-screen flex flex-col">
  {/* Tab Buttons */}
  <div className="flex gap-2 mb-6 pb-2 overflow-x-auto scrollbar-hide sticky top-0 bg-gray-900 z-10">
    {tabs.map((tab, index) => (
      <button
        key={index}
        onClick={() => setActiveTab(index)}
        className={`px-5 py-3 rounded-xl font-semibold whitespace-nowrap transition-all ${
          activeTab === index 
            ? 'bg-blue-600 shadow-lg shadow-blue-500/20' 
            : 'bg-gray-800 hover:bg-gray-700'
        }`}
        style={{ minWidth: '120px' }}
      >
        <span className="block truncate">{tab.title}</span>
      </button>
    ))}
  </div>

  {/* Scrollable Content Container */}
  <div className="flex-1 overflow-y-auto custom-scrollbar">
    <div className="space-y-6 pb-6">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`${
            activeTab === index ? 'block' : 'hidden'
          } bg-gray-800 rounded-2xl p-6 shadow-xl mx-2`}
        >
          <div className="text-center space-y-1 mb-6">
            <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent">
              {tab.title}
            </h2>
            <p className="text-red-300 font-medium">Minimum Deposit $80.00</p>
          </div>

          <div className="space-y-6">
            <p className="text-center text-red-300 font-semibold text-sm md:text-base">
              ⚠️ Copy address or scan QR code to ensure correct payment
            </p>

            {/* Address Box */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-gray-700/50 rounded-xl p-4 gap-3">
              <span className="font-mono text-sm md:text-base truncate flex-1">
                {tab.address}
              </span>
              <button
                onClick={() => copyAddress(tab.address)}
                className="bg-blue-600 hover:bg-blue-700 px-4 py-2.5 rounded-lg flex items-center gap-2 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 512 512">
                  <path d="M384 96V0H272c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h192c26.5 0 48-21.5 48-48V128H384zM192 352V128H48c-26.5 0-48 21.5-48 48v288c0 26.5 21.5 48 48 48h192c26.5 0 48-21.5 48-48v-32H192z" />
                </svg>
                <span className="hidden sm:block text-sm">Copy</span>
              </button>
            </div>

            {/* QR Code Section */}
            <div className="p-4 bg-white rounded-2xl shadow-lg mx-auto w-max">
              <img
                className="w-48 h-48 md:w-56 md:h-56"
                src={tab.qr}
                alt="QR Code"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Sticky Footer */}
  <div className="sticky bottom-0 bg-gray-900 pt-4 pb-6 px-4 border-t border-gray-700">
    <div className="max-w-2xl mx-auto space-y-4">
      <p className="text-green-400 font-semibold text-sm md:text-base text-center">
        ⌛ Wait for 2-3 blockchain confirmations, then refresh to see balance.
      </p>
      <p className="text-white font-extrabold text-sm md:text-base text-center">
      Once payment is confirmed, orders awaiting payment will be processed successfully.
      </p>
      <a
        href="https://t.me/cvvglitchshop"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded-xl font-semibold transition-all transform hover:-translate-y-0.5 mx-auto group w-full sm:w-auto"
      >
        <span>Chat Support</span>
        <svg
          className="w-5 h-5 ml-2 group-hover:animate-wiggle"
          fill="currentColor"
          viewBox="0 0 496 512"
        >
          <path d="M248 8C111 8 0 119 0 256S111 504 248 504 496 392 496 256 385 8 248 8zm114 176.7c-3.7 39.2-19.9 134.4-28.1 178.3-3.5 18.6-10.3 24.8-16.9 25.4-14.4 1.3-25.3-9.5-39.3-18.7-21.8-14.3-34.2-23.2-55.3-37.2-24.5-16.1-8.6-25 5.3-39.5 3.7-3.8 67.1-61.5 68.3-66.8.2-.6.3-3.1-1.2-4.4s-3.6-.8-5.1-.5q-3.3.7-104.6 69.1-14.8 10.2-26.9 9.9c-8.9-.2-25.9-5-38.6-9.1-15.5-5-27.9-7.7-26.8-16.3q.8-6.7 18.5-13.7Q159.1 189 256 193c4.1 0 8.1.2 11.9.7 11.2.9 28.4-5.2 39.4-9.5 4.3-1.7 16.8-6.3 28.8-10.4 2.1-.7 6.6-1.4 9.6.3 2.4 1.4 3.4 4.2 3.7 6.7.6 5.5.6 18.8.1 25.1z" />
        </svg>
      </a>
    </div>
  </div>
</div>


      

    );
};

export default Checkout;
