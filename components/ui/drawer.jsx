import React, { createContext, useContext, useState, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  PanGestureHandler,
  Animated,
  StyleSheet,
  Dimensions,
} from 'react-native';

const DrawerContext = createContext({});

const Drawer = ({ children, open, onOpenChange }) => {
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
    <DrawerContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DrawerContext.Provider>
  );
};

const DrawerTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(DrawerContext);

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
DrawerTrigger.displayName = 'DrawerTrigger';

const DrawerContent = React.forwardRef(({ children, side = 'bottom', ...props }, ref) => {
  const { isOpen, onOpenChange } = useContext(DrawerContext);
  const translateY = useRef(new Animated.Value(0)).current;
  const screenHeight = Dimensions.get('window').height;

  const closeDrawer = () => {
    Animated.timing(translateY, {
      toValue: screenHeight,
      duration: 200,
      useNativeDriver: true,
    }).start(() => {
      onOpenChange(false);
    });
  };

  React.useEffect(() => {
    if (isOpen) {
      translateY.setValue(screenHeight);
      Animated.timing(translateY, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [isOpen]);

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="none"
      onRequestClose={closeDrawer}
      {...props}
    >
      <View style={styles.overlay}>
        <TouchableOpacity 
          style={styles.backdrop} 
          activeOpacity={1} 
          onPress={closeDrawer}
        />
        <Animated.View
          style={[
            styles.content,
            side === 'bottom' && styles.contentBottom,
            {
              transform: [{ translateY }],
            }
          ]}
        >
          <View style={styles.handle} />
          {children}
        </Animated.View>
      </View>
    </Modal>
  );
});
DrawerContent.displayName = 'DrawerContent';

const DrawerHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.header, props.style]} {...props}>
      {children}
    </View>
  );
});
DrawerHeader.displayName = 'DrawerHeader';

const DrawerTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.title, props.style]} {...props}>
      {children}
    </Text>
  );
});
DrawerTitle.displayName = 'DrawerTitle';

const DrawerDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.description, props.style]} {...props}>
      {children}
    </Text>
  );
});
DrawerDescription.displayName = 'DrawerDescription';

const DrawerFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.footer, props.style]} {...props}>
      {children}
    </View>
  );
});
DrawerFooter.displayName = 'DrawerFooter';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
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
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    minHeight: 200,
    maxHeight: '80%',
  },
  contentBottom: {
    alignSelf: 'stretch',
  },
  handle: {
    width: 40,
    height: 4,
    backgroundColor: '#D1D5DB',
    borderRadius: 2,
    alignSelf: 'center',
    marginTop: 8,
    marginBottom: 16,
  },
  header: {
    paddingHorizontal: 24,
    paddingBottom: 16,
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
    gap: 12,
  },
});

export {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
};