import React, { useState, useEffect } from 'react';
import { X, AlertTriangle, Info, CheckCircle } from 'lucide-react';

interface NotificationBannerProps {
  type: 'info' | 'warning' | 'success' | 'error';
  message: string;
  onClose: () => void;
  autoClose?: boolean;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({
  type,
  message,
  onClose,
  autoClose = true
}) => {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        setVisible(false);
        setTimeout(onClose, 300);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [autoClose, onClose]);

  const typeConfig = {
    info: {
      bg: 'bg-blue-50 border-blue-200',
      text: 'text-blue-800',
      icon: Info
    },
    warning: {
      bg: 'bg-yellow-50 border-yellow-200',
      text: 'text-yellow-800',
      icon: AlertTriangle
    },
    success: {
      bg: 'bg-green-50 border-green-200',
      text: 'text-green-800',
      icon: CheckCircle
    },
    error: {
      bg: 'bg-red-50 border-red-200',
      text: 'text-red-800',
      icon: AlertTriangle
    }
  };

  const config = typeConfig[type];
  const Icon = config.icon;

  return (
    <div
      className={`fixed top-20 left-4 right-4 z-50 p-4 border rounded-lg shadow-lg transition-all duration-300 ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-2'
      } ${config.bg}`}
    >
      <div className="flex items-start gap-3">
        <Icon className={`w-5 h-5 flex-shrink-0 ${config.text}`} />
        <p className={`flex-1 text-sm ${config.text}`}>{message}</p>
        <button
          onClick={() => {
            setVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`p-1 hover:bg-black/10 rounded ${config.text}`}
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default NotificationBanner;