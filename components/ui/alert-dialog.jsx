import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const AlertDialogContext = createContext({});

const AlertDialog = ({ children, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;

  const handleOpenChange = (newOpen) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  return (
    <AlertDialogContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </AlertDialogContext.Provider>
  );
};

const AlertDialogTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(AlertDialogContext);

  const handlePress = () => {
    onOpenChange(true);
  };

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPress: handlePress,
      ref,
      ...props,
    });
  }

  return (
    <TouchableOpacity ref={ref} onPress={handlePress} {...props}>
      {children}
    </TouchableOpacity>
  );
});
AlertDialogTrigger.displayName = 'AlertDialogTrigger';

const AlertDialogContent = React.forwardRef(({ children, ...props }, ref) => {
  const { isOpen, onOpenChange } = useContext(AlertDialogContext);

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={() => onOpenChange(false)}
        />
        <View style={styles.content}>
          {children}
        </View>
      </View>
    </Modal>
  );
});
AlertDialogContent.displayName = 'AlertDialogContent';

const AlertDialogHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.header, props.style]} {...props}>
      {children}
    </View>
  );
});
AlertDialogHeader.displayName = 'AlertDialogHeader';

const AlertDialogTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.title, props.style]} {...props}>
      {children}
    </Text>
  );
});
AlertDialogTitle.displayName = 'AlertDialogTitle';

const AlertDialogDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.description, props.style]} {...props}>
      {children}
    </Text>
  );
});
AlertDialogDescription.displayName = 'AlertDialogDescription';

const AlertDialogFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.footer, props.style]} {...props}>
      {children}
    </View>
  );
});
AlertDialogFooter.displayName = 'AlertDialogFooter';

const AlertDialogAction = React.forwardRef(({ children, onPress, ...props }, ref) => {
  const { onOpenChange } = useContext(AlertDialogContext);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    onOpenChange(false);
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      style={[styles.actionButton, styles.actionButtonPrimary, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[styles.actionButtonText, styles.actionButtonTextPrimary]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
AlertDialogAction.displayName = 'AlertDialogAction';

const AlertDialogCancel = React.forwardRef(({ children, onPress, ...props }, ref) => {
  const { onOpenChange } = useContext(AlertDialogContext);

  const handlePress = () => {
    if (onPress) {
      onPress();
    }
    onOpenChange(false);
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      style={[styles.actionButton, styles.actionButtonSecondary, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[styles.actionButtonText, styles.actionButtonTextSecondary]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
AlertDialogCancel.displayName = 'AlertDialogCancel';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  backdrop: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 24,
    marginHorizontal: 20,
    maxWidth: Dimensions.get('window').width - 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 24,
    gap: 12,
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 6,
    minWidth: 80,
    alignItems: 'center',
  },
  actionButtonPrimary: {
    backgroundColor: '#111827',
  },
  actionButtonSecondary: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  actionButtonText: {
    fontSize: 14,
    fontWeight: '500',
  },
  actionButtonTextPrimary: {
    color: '#ffffff',
  },
  actionButtonTextSecondary: {
    color: '#374151',
  },
});

export {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
};