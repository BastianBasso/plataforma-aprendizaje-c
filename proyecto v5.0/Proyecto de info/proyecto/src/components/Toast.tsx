import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'warning' | 'error' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

const Toast: React.FC<ToastProps> = ({ 
  type, 
  message, 
  onClose,
  duration = 5000
}) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onClose, 300); // Allow exit animation to play
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const getToastStyles = () => {
    switch (type) {
      case 'success':
        return {
          bgColor: 'bg-green-100 dark:bg-green-900/30',
          textColor: 'text-green-800 dark:text-green-400',
          icon: <CheckCircle className="h-5 w-5 text-green-500 dark:text-green-400" />
        };
      case 'warning':
        return {
          bgColor: 'bg-yellow-100 dark:bg-yellow-900/30',
          textColor: 'text-yellow-800 dark:text-yellow-400',
          icon: <AlertTriangle className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
        };
      case 'error':
        return {
          bgColor: 'bg-red-100 dark:bg-red-900/30',
          textColor: 'text-red-800 dark:text-red-400',
          icon: <XCircle className="h-5 w-5 text-red-500 dark:text-red-400" />
        };
      case 'info':
      default:
        return {
          bgColor: 'bg-blue-100 dark:bg-blue-900/30',
          textColor: 'text-blue-800 dark:text-blue-400',
          icon: <Info className="h-5 w-5 text-blue-500 dark:text-blue-400" />
        };
    }
  };

  const { bgColor, textColor, icon } = getToastStyles();

  return (
    <div 
      className={`fixed bottom-5 right-5 flex items-center w-full max-w-xs p-4 mb-4 rounded-lg shadow-lg 
      ${bgColor} transition-all duration-300 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}
      role="alert"
    >
      <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-lg">
        {icon}
      </div>
      <div className={`ml-3 text-sm font-normal ${textColor}`}>{message}</div>
      <button
        type="button"
        className="ml-auto -mx-1.5 -my-1.5 bg-white text-gray-400 hover:text-gray-900 rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-100 inline-flex items-center justify-center h-8 w-8 dark:text-gray-500 dark:hover:text-white dark:bg-gray-800/50 dark:hover:bg-gray-700"
        onClick={() => {
          setIsVisible(false);
          setTimeout(onClose, 300);
        }}
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
};

export default Toast;