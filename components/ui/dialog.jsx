import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

const DialogContext = createContext({});

const Dialog = ({ children, open, onOpenChange }) => {
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
    <DialogContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DialogContext.Provider>
  );
};

const DialogTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(DialogContext);

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
DialogTrigger.displayName = 'DialogTrigger';

const DialogContent = React.forwardRef(({ children, ...props }, ref) => {
  const { isOpen, onOpenChange } = useContext(DialogContext);

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
          <TouchableOpacity 
            onPress={() => onOpenChange(false)}
            style={styles.closeButton}
          >
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
          {children}
        </View>
      </View>
    </Modal>
  );
});
DialogContent.displayName = 'DialogContent';

const DialogHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.header, props.style]} {...props}>
      {children}
    </View>
  );
});
DialogHeader.displayName = 'DialogHeader';

const DialogTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.title, props.style]} {...props}>
      {children}
    </Text>
  );
});
DialogTitle.displayName = 'DialogTitle';

const DialogDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.description, props.style]} {...props}>
      {children}
    </Text>
  );
});
DialogDescription.displayName = 'DialogDescription';

const DialogFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.footer, props.style]} {...props}>
      {children}
    </View>
  );
});
DialogFooter.displayName = 'DialogFooter';

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
    maxHeight: Dimensions.get('window').height * 0.8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    elevation: 8,
    position: 'relative',
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
  },
  header: {
    marginBottom: 16,
    paddingRight: 32,
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
});

export {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
};