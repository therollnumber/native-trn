import React, { createContext, useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Modal,
  StyleSheet,
  Dimensions,
} from 'react-native';

const ContextMenuContext = createContext({});

const ContextMenu = ({ children, onOpenChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleOpenChange = (open, gesturePosition) => {
    setIsOpen(open);
    if (gesturePosition) {
      setPosition(gesturePosition);
    }
    if (onOpenChange) {
      onOpenChange(open);
    }
  };

  return (
    <ContextMenuContext.Provider value={{ isOpen, onOpenChange: handleOpenChange, position }}>
      {children}
    </ContextMenuContext.Provider>
  );
};

const ContextMenuTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(ContextMenuContext);

  const handleLongPress = (event) => {
    const { pageX, pageY } = event.nativeEvent;
    onOpenChange(true, { x: pageX, y: pageY });
  };

  return (
    <TouchableOpacity
      ref={ref}
      onLongPress={handleLongPress}
      activeOpacity={0.7}
      style={props.style}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
ContextMenuTrigger.displayName = 'ContextMenuTrigger';

const ContextMenuContent = React.forwardRef(({ children, ...props }, ref) => {
  const { isOpen, onOpenChange, position } = useContext(ContextMenuContext);
  const screenWidth = Dimensions.get('window').width;
  const screenHeight = Dimensions.get('window').height;

  const menuWidth = 200;
  const menuHeight = 300;

  const adjustedPosition = {
    x: Math.min(position.x, screenWidth - menuWidth - 20),
    y: Math.min(position.y, screenHeight - menuHeight - 20),
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
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={() => onOpenChange(false)}
      >
        <View
          style={[
            styles.content,
            {
              left: adjustedPosition.x,
              top: adjustedPosition.y,
            }
          ]}
        >
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
ContextMenuContent.displayName = 'ContextMenuContent';

const ContextMenuItem = React.forwardRef(({ children, onSelect, disabled, ...props }, ref) => {
  const { onOpenChange } = useContext(ContextMenuContext);

  const handleSelect = () => {
    if (disabled) return;
    if (onSelect) {
      onSelect();
    }
    onOpenChange(false);
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handleSelect}
      disabled={disabled}
      style={[
        styles.menuItem,
        disabled && styles.menuItemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
ContextMenuItem.displayName = 'ContextMenuItem';

const ContextMenuSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.separator, props.style]}
      {...props}
    />
  );
});
ContextMenuSeparator.displayName = 'ContextMenuSeparator';

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
  },
  content: {
    position: 'absolute',
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 200,
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
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
});

export {
  ContextMenu,
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
};