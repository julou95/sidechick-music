import { useEffect } from "react";

const useOneSignal = () =>
  useEffect(() => {
    window.OneSignal = window.OneSignal || [];
    OneSignal.push(function () {
      console.log('LJ - ', '???');
      OneSignal.init({
        appId: '1184d288-90ec-426f-b29e-a101280b6fd3',
        safari_web_id: "web.onesignal.auto.087eca46-faed-450d-af5b-90e7f525c88c",
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