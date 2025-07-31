export const showNotification = (title: string, body: string, type: 'info' | 'warning' | 'success' | 'error' = 'info') => {
  if ('Notification' in window && Notification.permission === 'granted') {
    new Notification(title, {
      body,
      icon: '/vite.svg',
      badge: '/vite.svg'
    });
  } else {
    // Fallback to console log or custom toast
    console.log(`${type.toUpperCase()}: ${title} - ${body}`);
  }
};

export const requestNotificationPermission = async () => {
  if ('Notification' in window) {
    const permission = await Notification.requestPermission();
    return permission === 'granted';
  }
  return false;
};

export const simulateRealTimeUpdates = (callback: () => void) => {
  const interval = setInterval(() => {
    callback();
  }, 30000); // Update every 30 seconds
  
  return () => clearInterval(interval);
};