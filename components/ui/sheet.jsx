import React, { createContext, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { X } from 'lucide-react-native';

const SheetContext = createContext({});

const Sheet = ({ children, open, onOpenChange }) => {
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
    <SheetContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </SheetContext.Provider>
  );
};

const SheetTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(SheetContext);

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
SheetTrigger.displayName = 'SheetTrigger';

const SheetContent = React.forwardRef(({ 
  children, 
  side = 'right',
  ...props 
}, ref) => {
  const { isOpen, onOpenChange } = useContext(SheetContext);
  const translateX = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(0)).current;
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const closeSheet = () => {
    const toValue = side === 'right' ? screenWidth : 
                   side === 'left' ? -screenWidth :
                   side === 'bottom' ? screenHeight : -screenHeight;
    
    const animateValue = ['left', 'right'].includes(side) ? translateX : translateY;
    
    Animated.timing(animateValue, {
      toValue,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onOpenChange(false);
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      const fromValue = side === 'right' ? screenWidth : 
                       side === 'left' ? -screenWidth :
                       side === 'bottom' ? screenHeight : -screenHeight;
      
      const animateValue = ['left', 'right'].includes(side) ? translateX : translateY;
      
      animateValue.setValue(fromValue);
      Animated.timing(animateValue, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen, side]);

  const getContentStyles = () => {
    const baseStyles = [styles.content];
    const transform = [];
    
    if (['left', 'right'].includes(side)) {
      transform.push({ translateX });
      baseStyles.push(styles.verticalSheet);
      if (side === 'right') baseStyles.push(styles.rightSheet);
      if (side === 'left') baseStyles.push(styles.leftSheet);
    } else {
      transform.push({ translateY });
      baseStyles.push(styles.horizontalSheet);
      if (side === 'bottom') baseStyles.push(styles.bottomSheet);
      if (side === 'top') baseStyles.push(styles.topSheet);
    }
    
    return [baseStyles, { transform }];
  };

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="none"
      onRequestClose={closeSheet}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={closeSheet}
        />
        <Animated.View style={getContentStyles()}>
          <TouchableOpacity onPress={closeSheet} style={styles.closeButton}>
            <X size={20} color="#6B7280" />
          </TouchableOpacity>
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
});
SheetContent.displayName = 'SheetContent';

const SheetHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.header, props.style]} {...props}>
      {children}
    </View>
  );
});
SheetHeader.displayName = 'SheetHeader';

const SheetTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.title, props.style]} {...props}>
      {children}
    </Text>
  );
});
SheetTitle.displayName = 'SheetTitle';

const SheetDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.description, props.style]} {...props}>
      {children}
    </Text>
  );
});
SheetDescription.displayName = 'SheetDescription';

const SheetFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.footer, props.style]} {...props}>
      {children}
    </View>
  );
});
SheetFooter.displayName = 'SheetFooter';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
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
    position: 'absolute',
  },
  verticalSheet: {
    top: 0,
    bottom: 0,
    width: '80%',
    maxWidth: 400,
  },
  horizontalSheet: {
    left: 0,
    right: 0,
    height: '60%',
    maxHeight: 600,
  },
  rightSheet: {
    right: 0,
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },
  leftSheet: {
    left: 0,
    borderTopRightRadius: 16,
    borderBottomRightRadius: 16,
  },
  bottomSheet: {
    bottom: 0,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  topSheet: {
    top: 0,
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  closeButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 1,
    padding: 4,
    borderRadius: 4,
    backgroundColor: '#F9FAFB',
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
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
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    gap: 12,
  },
});

export {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetDescription,
  SheetFooter,
};