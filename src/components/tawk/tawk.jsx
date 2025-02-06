import React, { useRef } from 'react';
import TawkMessengerReact from '@tawk.to/tawk-messenger-react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

const TawkTo = () => {
  const tawkMessengerRef = useRef();
  const user = useSelector((state) => state.auth.user);
  const location = useLocation();

  // Don't render Tawk.to on login or register pages
  if (location.pathname === '/login' || location.pathname === '/register') {
    return null;
  }

  const handleOnLoad = () => {
    if (tawkMessengerRef.current && user?.email) {
      tawkMessengerRef.current.setAttributes(
        {
          name: user.userName || 'Guest',
          email: user.email,
          userId: user._id,
        },
        (error) => {
          if (error) {
            console.error('Tawk API Error:', error);
          }
        }
      );
    }
  };

  return (
    <TawkMessengerReact
      propertyId="67a23d823a8427326079a65a"
      widgetId="default"
      onLoad={handleOnLoad}
      ref={tawkMessengerRef}
    />
  );
};

export default TawkTo;
