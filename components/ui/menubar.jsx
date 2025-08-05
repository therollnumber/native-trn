import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

const MenubarContext = createContext({});

const Menubar = React.forwardRef(({ children, ...props }, ref) => {
  const [activeMenu, setActiveMenu] = useState(null);

  return (
    <MenubarContext.Provider value={{ activeMenu, setActiveMenu }}>
      <View ref={ref} style={[styles.menubar, props.style]} {...props}>
        {children}
      </View>
    </MenubarContext.Provider>
  );
});
Menubar.displayName = 'Menubar';

const MenubarMenu = ({ children, value }) => {
  return (
    <MenubarContext.Provider value={{ menuValue: value }}>
      {children}
    </MenubarContext.Provider>
  );
};

const MenubarTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { activeMenu, setActiveMenu, menuValue } = useContext(MenubarContext);
  const isActive = activeMenu === menuValue;

  const handlePress = () => {
    setActiveMenu(isActive ? null : menuValue);
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      style={[
        styles.trigger,
        isActive && styles.triggerActive,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.triggerText,
        isActive && styles.triggerTextActive
      ]}>
        {children}
      </Text>
      <ChevronDown 
        size={16} 
        color={isActive ? '#4F7CFF' : '#6B7280'} 
        style={styles.triggerIcon}
      />
    </TouchableOpacity>
  );
});
MenubarTrigger.displayName = 'MenubarTrigger';

const MenubarContent = React.forwardRef(({ children, ...props }, ref) => {
  const { activeMenu, setActiveMenu, menuValue } = useContext(MenubarContext);
  const isOpen = activeMenu === menuValue;

  return (
    <Modal
      ref={ref}
      visible={isOpen}
      transparent={true}
      animationType="fade"
      onRequestClose={() => setActiveMenu(null)}
      {...props}
    >
      <TouchableOpacity 
        style={styles.overlay} 
        activeOpacity={1} 
        onPress={() => setActiveMenu(null)}
      >
        <View style={styles.content}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
MenubarContent.displayName = 'MenubarContent';

const MenubarItem = React.forwardRef(({ 
  children, 
  onSelect, 
  disabled = false,
  ...props 
}, ref) => {
  const { setActiveMenu } = useContext(MenubarContext);

  const handleSelect = () => {
    if (disabled) return;
    if (onSelect) {
      onSelect();
    }
    setActiveMenu(null);
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
      <Text style={[
        styles.menuItemText,
        disabled && styles.menuItemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
MenubarItem.displayName = 'MenubarItem';

const MenubarSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.separator, props.style]}
      {...props}
    />
  );
});
MenubarSeparator.displayName = 'MenubarSeparator';

const styles = StyleSheet.create({
  menubar: {
    flexDirection: 'row',
    backgroundColor: '#ffffff',
    borderRadius: 6,
    padding: 4,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  triggerActive: {
    backgroundColor: '#F3F4F6',
  },
  triggerText: {
    fontSize: 14,
    color: '#374151',
    marginRight: 4,
  },
  triggerTextActive: {
    color: '#4F7CFF',
  },
  triggerIcon: {
    marginLeft: 4,
  },
  overlay: {
    flex: 1,
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
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
  menuItemText: {
    fontSize: 14,
    color: '#111827',
  },
  menuItemTextDisabled: {
    color: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
});

export {
  Menubar,
  MenubarMenu,
  MenubarTrigger,
  MenubarContent,
  MenubarItem,
  MenubarSeparator,
};