import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X, CheckCircle, AlertTriangle, AlertCircle, Info } from 'lucide-react-native';

const ToasterContext = createContext({});

let toastId = 0;

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (toast) => {
    const id = toastId++;
    const newToast = { id, ...toast };
    setToasts(prev => [...prev, newToast]);
    
    if (toast.duration !== 0) {
      setTimeout(() => {
        removeToast(id);
      }, toast.duration || 4000);
    }
    
    return id;
  };

  const removeToast = (id) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const clearToasts = () => {
    setToasts([]);
  };

  return (
    <ToasterContext.Provider value={{ toasts, addToast, removeToast, clearToasts }}>
      {children}
      <ToastContainer />
    </ToasterContext.Provider>
  );
};

const useToast = () => {
  const context = useContext(ToasterContext);
  if (!context) {
    // Provide a fallback implementation
    return {
      toast: (options) => {
        console.log('Toast:', options);
      },
      dismiss: () => {},
    };
  }
  
  const { addToast, removeToast } = context;
  
  return {
    toast: (options) => addToast(options),
    dismiss: (id) => removeToast(id),
  };
};

// Individual Toast Component
const Toast = ({ toast, onDismiss }) => {
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  const slideAnim = React.useRef(new Animated.Value(-100)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();

    return () => {
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 0,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: -100,
          duration: 200,
          useNativeDriver: true,
        }),
      ]).start();
    };
  }, []);

  const getIcon = () => {
    switch (toast.type) {
      case 'success':
        return <CheckCircle size={20} color="#10B981" />;
      case 'error':
        return <AlertCircle size={20} color="#EF4444" />;
      case 'warning':
        return <AlertTriangle size={20} color="#F59E0B" />;
      case 'info':
        return <Info size={20} color="#3B82F6" />;
      default:
        return null;
    }
  };

  const getBackgroundColor = () => {
    switch (toast.type) {
      case 'success':
        return '#F0FDF4';
      case 'error':
        return '#FEF2F2';
      case 'warning':
        return '#FFFBEB';
      case 'info':
        return '#EFF6FF';
      default:
        return '#ffffff';
    }
  };

  return (
    <Animated.View
      style={[
        styles.toast,
        {
          backgroundColor: getBackgroundColor(),
          opacity: fadeAnim,
          transform: [{ translateY: slideAnim }],
        },
      ]}
    >
      <View style={styles.toastContent}>
        {getIcon()}
        <View style={styles.toastText}>
          {toast.title && (
            <Text style={styles.toastTitle}>{toast.title}</Text>
          )}
          {toast.description && (
            <Text style={styles.toastDescription}>{toast.description}</Text>
          )}
        </View>
        <TouchableOpacity
          onPress={() => onDismiss(toast.id)}
          style={styles.toastClose}
        >
          <X size={16} color="#6B7280" />
        </TouchableOpacity>
      </View>
    </Animated.View>
  );
};

// Toast Container
const ToastContainer = () => {
  const { toasts, removeToast } = useContext(ToasterContext);

  return (
    <View style={styles.toastContainer}>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          toast={toast}
          onDismiss={removeToast}
        />
      ))}
    </View>
  );
};

// Main Toaster component
const Toaster = React.forwardRef(({ 
  position = 'top-right',
  ...props 
}, ref) => {
  return <View ref={ref} {...props} />;
});
Toaster.displayName = 'Toaster';

// Convenience toast function
const toast = (message, options = {}) => {
  if (typeof message === 'string') {
    return {
      title: message,
      ...options,
    };
  }
  return message;
};

// Additional toast methods
toast.success = (message, options) => toast(message, { ...options, type: 'success' });
toast.error = (message, options) => toast(message, { ...options, type: 'error' });
toast.warning = (message, options) => toast(message, { ...options, type: 'warning' });
toast.info = (message, options) => toast(message, { ...options, type: 'info' });

const styles = StyleSheet.create({
  toastContainer: {
    position: 'absolute',
    top: 50,
    right: 16,
    left: 16,
    zIndex: 1000,
    pointerEvents: 'box-none',
  },
  toast: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 4,
  },
  toastContent: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  toastText: {
    flex: 1,
    marginLeft: 12,
  },
  toastTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  toastDescription: {
    fontSize: 12,
    color: '#6B7280',
    lineHeight: 16,
  },
  toastClose: {
    padding: 4,
    marginLeft: 8,
  },
});

export {
  ToastProvider,
  useToast,
  Toaster,
  toast,
};