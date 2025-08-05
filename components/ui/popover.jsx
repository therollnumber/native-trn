import React, { createContext, useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const PopoverContext = createContext({});

const Popover = ({ children, open, onOpenChange }) => {
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
    <PopoverContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </PopoverContext.Provider>
  );
};

const PopoverTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(PopoverContext);

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
PopoverTrigger.displayName = 'PopoverTrigger';

const PopoverContent = React.forwardRef(({ 
  children, 
  align = 'center', 
  side = 'bottom',
  ...props 
}, ref) => {
  const { isOpen, onOpenChange } = useContext(PopoverContext);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const getContentPosition = () => {
    // Simple centered positioning for mobile
    return {
      justifyContent: 'center',
      alignItems: 'center',
    };
  };

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => onOpenChange(false)}
      {...props}
    >
      <TouchableOpacity 
        style={[styles.overlay, getContentPosition()]} 
        activeOpacity={1} 
        onPress={() => onOpenChange(false)}
      >
        <View style={styles.content}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
PopoverContent.displayName = 'PopoverContent';

const PopoverAnchor = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={props.style} {...props}>
      {children}
    </View>
  );
});
PopoverAnchor.displayName = 'PopoverAnchor';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
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
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
});

export {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverAnchor,
};