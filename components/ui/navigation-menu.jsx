import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

const NavigationMenuContext = createContext({});

const NavigationMenu = React.forwardRef(({ children, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState('');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <NavigationMenuContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <View ref={ref} style={[styles.navigationMenu, props.style]} {...props}>
        {children}
      </View>
    </NavigationMenuContext.Provider>
  );
});
NavigationMenu.displayName = 'NavigationMenu';

const NavigationMenuList = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.navigationMenuList, props.style]} {...props}>
      {children}
    </View>
  );
});
NavigationMenuList.displayName = 'NavigationMenuList';

const NavigationMenuItem = React.forwardRef(({ children, value, ...props }, ref) => {
  return (
    <NavigationMenuContext.Provider value={{ itemValue: value }}>
      <View ref={ref} style={[styles.navigationMenuItem, props.style]} {...props}>
        {children}
      </View>
    </NavigationMenuContext.Provider>
  );
});
NavigationMenuItem.displayName = 'NavigationMenuItem';

const NavigationMenuTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { value, onValueChange, itemValue } = useContext(NavigationMenuContext);
  const isActive = value === itemValue;

  const handlePress = () => {
    onValueChange(isActive ? '' : itemValue);
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
        style={[
          styles.triggerIcon,
          isActive && styles.triggerIconActive
        ]}
      />
    </TouchableOpacity>
  );
});
NavigationMenuTrigger.displayName = 'NavigationMenuTrigger';

const NavigationMenuContent = React.forwardRef(({ children, ...props }, ref) => {
  const { value, itemValue } = useContext(NavigationMenuContext);
  const isOpen = value === itemValue;

  if (!isOpen) return null;

  return (
    <View ref={ref} style={[styles.content, props.style]} {...props}>
      {children}
    </View>
  );
});
NavigationMenuContent.displayName = 'NavigationMenuContent';

const NavigationMenuLink = React.forwardRef(({ children, onPress, active, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[
        styles.link,
        active && styles.linkActive,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.linkText,
        active && styles.linkTextActive
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
NavigationMenuLink.displayName = 'NavigationMenuLink';

const NavigationMenuIndicator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.indicator, props.style]}
      {...props}
    />
  );
});
NavigationMenuIndicator.displayName = 'NavigationMenuIndicator';

const NavigationMenuViewport = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.viewport, props.style]} {...props}>
      {children}
    </View>
  );
});
NavigationMenuViewport.displayName = 'NavigationMenuViewport';

const styles = StyleSheet.create({
  navigationMenu: {
    position: 'relative',
  },
  navigationMenuList: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  navigationMenuItem: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 6,
  },
  triggerActive: {
    backgroundColor: '#F3F4F6',
  },
  triggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
  },
  triggerTextActive: {
    color: '#4F7CFF',
  },
  triggerIcon: {
    marginLeft: 4,
    transform: [{ rotate: '0deg' }],
  },
  triggerIconActive: {
    transform: [{ rotate: '180deg' }],
  },
  content: {
    position: 'absolute',
    top: '100%',
    left: 0,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    padding: 16,
    marginTop: 4,
    minWidth: 300,
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
    zIndex: 50,
  },
  link: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
  },
  linkActive: {
    backgroundColor: '#EFF6FF',
  },
  linkText: {
    fontSize: 14,
    color: '#374151',
  },
  linkTextActive: {
    color: '#4F7CFF',
    fontWeight: '500',
  },
  indicator: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 2,
    backgroundColor: '#4F7CFF',
    borderRadius: 1,
  },
  viewport: {
    position: 'relative',
    width: '100%',
  },
});

export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
};