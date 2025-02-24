import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const TawkTo = () => {
  const location = useLocation();

  useEffect(() => {
    // Ensure the script does not load on auth/login and auth/register routes
    if (!location.pathname.startsWith('/auth/login') && !location.pathname.startsWith('/auth/register')) {
      // Initialize LiveChat script
      window.__lc = window.__lc || {};
      window.__lc.license = 19051053; // Replace with your actual LiveChat license ID
      window.__lc.integration_name = "manual_onboarding";
      window.__lc.product_name = "livechat";

      (function(n, t, c) {
        function i(n) {
          return e._h ? e._h.apply(null, n) : e._q.push(n);
        }
        var e = {
          _q: [],
          _h: null,
          _v: "2.0",
          on: function() {
            i(["on", c.call(arguments)]);
          },
          once: function() {
            i(["once", c.call(arguments)]);
          },
          off: function() {
            i(["off", c.call(arguments)]);
          },
          get: function() {
            if (!e._h) throw new Error("[LiveChatWidget] You can't use getters before load.");
            return i(["get", c.call(arguments)]);
          },
          call: function() {
            i(["call", c.call(arguments)]);
          },
          init: function() {
            var n = t.createElement("script");
            n.async = true;
            n.type = "text/javascript";
            n.src = "https://cdn.livechatinc.com/tracking.js";
            t.head.appendChild(n);
          }
        };
        if (!n.__lc.asyncInit) {
          e.init();
        }
        n.LiveChatWidget = n.LiveChatWidget || e;
      }(window, document, [].slice));
    }
  }, [location.pathname]);

  return null; // This component does not render anything
};

export default TawkTo;