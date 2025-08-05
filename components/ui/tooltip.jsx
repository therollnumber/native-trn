import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

const TooltipContext = createContext({});

const TooltipProvider = ({ children, delayDuration = 200, disableHoverableContent = false }) => {
  return (
    <TooltipContext.Provider value={{ delayDuration, disableHoverableContent }}>
      {children}
    </TooltipContext.Provider>
  );
};

const Tooltip = ({ children, open, onOpenChange, delayDuration }) => {
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
    <TooltipContext.Provider value={{ 
      isOpen, 
      onOpenChange: handleOpenChange, 
      delayDuration 
    }}>
      {children}
    </TooltipContext.Provider>
  );
};

const TooltipTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(TooltipContext);

  // Since React Native doesn't have hover, we'll use press events
  const handlePressIn = () => {
    onOpenChange(true);
  };

  const handlePressOut = () => {
    // Delay hiding to allow interaction
    setTimeout(() => onOpenChange(false), 1000);
  };

  if (React.isValidElement(children)) {
    return React.cloneElement(children, {
      onPressIn: handlePressIn,
      onPressOut: handlePressOut,
      ref,
      ...props,
    });
  }

  return (
    <TouchableOpacity
      ref={ref}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
TooltipTrigger.displayName = 'TooltipTrigger';

const TooltipContent = React.forwardRef(({ 
  children, 
  side = 'top',
  align = 'center',
  sideOffset = 4,
  ...props 
}, ref) => {
  const { isOpen, onOpenChange } = useContext(TooltipContext);

  if (!isOpen) return null;

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
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={() => onOpenChange(false)}
      >
        <View style={[
          styles.content,
          side === 'top' && styles.contentTop,
          side === 'bottom' && styles.contentBottom,
          side === 'left' && styles.contentLeft,
          side === 'right' && styles.contentRight,
        ]}>
          <Text style={styles.contentText}>{children}</Text>
          {/* Arrow indicator */}
          <View style={[
            styles.arrow,
            side === 'top' && styles.arrowTop,
            side === 'bottom' && styles.arrowBottom,
            side === 'left' && styles.arrowLeft,
            side === 'right' && styles.arrowRight,
          ]} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
TooltipContent.displayName = 'TooltipContent';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#1F2937',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 8,
    maxWidth: 200,
    position: 'relative',
  },
  contentTop: {
    marginBottom: 8,
  },
  contentBottom: {
    marginTop: 8,
  },
  contentLeft: {
    marginRight: 8,
  },
  contentRight: {
    marginLeft: 8,
  },
  contentText: {
    fontSize: 12,
    color: '#ffffff',
    textAlign: 'center',
    lineHeight: 16,
  },
  arrow: {
    position: 'absolute',
    width: 8,
    height: 8,
    backgroundColor: '#1F2937',
  },
  arrowTop: {
    bottom: -4,
    left: '50%',
    marginLeft: -4,
    transform: [{ rotate: '45deg' }],
  },
  arrowBottom: {
    top: -4,
    left: '50%',
    marginLeft: -4,
    transform: [{ rotate: '45deg' }],
  },
  arrowLeft: {
    right: -4,
    top: '50%',
    marginTop: -4,
    transform: [{ rotate: '45deg' }],
  },
  arrowRight: {
    left: -4,
    top: '50%',
    marginTop: -4,
    transform: [{ rotate: '45deg' }],
  },
});

export {
  TooltipProvider,
  Tooltip,
  TooltipTrigger,
  TooltipContent,
};