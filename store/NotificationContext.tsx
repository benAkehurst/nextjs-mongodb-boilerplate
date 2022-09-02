import { createContext, useState, useEffect } from 'react';
import { NotificationProps } from '../components/UI/NotificationElement';

const NotificationContext = createContext({
  notification: null,
  showNotification: (notificationData: NotificationProps) => {},
  hideNotification: () => {},
});

export function NotificationContextProvider(props: any) {
  const [activeNotification, setActiveNotification] = useState<any>(null);

  useEffect(() => {
    if (
      activeNotification &&
      (activeNotification.status === 'success' ||
        activeNotification.status === 'error')
    ) {
      const timer = setTimeout(() => {
        hideNotificationHandler();
      }, 3000);

      return () => {
        clearTimeout(timer);
      };
    }
  }, [activeNotification]);

  function showNotificationHandler(notificationData: any) {
    setActiveNotification(notificationData);
  }

  function hideNotificationHandler() {
    setActiveNotification(null);
  }

  const context = {
    notification: activeNotification,
    showNotification: showNotificationHandler,
    hideNotification: hideNotificationHandler,
  };

  return (
    <NotificationContext.Provider value={context}>
      {props.children}
    </NotificationContext.Provider>
  );
}

export default NotificationContext;
