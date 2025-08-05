import React, { createContext, useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';

// Note: React Native doesn't have hover events, so this simulates hover with press
const HoverCardContext = createContext({});

const HoverCard = ({ children, openDelay = 200, closeDelay = 300 }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <HoverCardContext.Provider value={{ isOpen, setIsOpen }}>
      {children}
    </HoverCardContext.Provider>
  );
};

const HoverCardTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { setIsOpen } = useContext(HoverCardContext);

  const handlePressIn = () => {
    setIsOpen(true);
  };

  const handlePressOut = () => {
    // Delay closing to allow interaction with content
    setTimeout(() => setIsOpen(false), 300);
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPressIn={handlePressIn}
      onPressOut={handlePressOut}
      activeOpacity={1}
      style={props.style}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
HoverCardTrigger.displayName = 'HoverCardTrigger';

const HoverCardContent = React.forwardRef(({ children, align = 'center', side = 'top', ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(HoverCardContext);

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setIsOpen(false)}
      {...props}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={() => setIsOpen(false)}
      >
        <View style={[
          styles.content,
          side === 'top' && styles.contentTop,
          side === 'bottom' && styles.contentBottom,
          side === 'left' && styles.contentLeft,
          side === 'right' && styles.contentRight,
        ]}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
HoverCardContent.displayName = 'HoverCardContent';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    maxWidth: 300,
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
});

export {
  HoverCard,
  HoverCardTrigger,
  HoverCardContent,
};