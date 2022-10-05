import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      OneSignal.init({
        appId: process.env.OS_ID,
        safari_web_id: process.env.OS_WEB_ID,
        notifyButton: {
          enable: true,
          displayPredicate: function() {
            return OneSignal.isPushNotificationsEnabled()
              .then(function(isPushEnabled) {
                  /* The user is subscribed, so we want to return "false" to hide the Subscription Bell */
                  return !isPushEnabled;
              });
          },
        },
        allowLocalhostAsSecureOrigin: true,
      });
    });

    return () => {
      window.OneSignal = undefined;
    };
  }, []);

export default useOneSignal;