import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  ScrollView,
  StyleSheet,
} from 'react-native';
import { Check, ChevronRight } from 'lucide-react-native';

const DropdownMenuContext = createContext({});

const DropdownMenu = ({ children, open, onOpenChange }) => {
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
    <DropdownMenuContext.Provider value={{ isOpen, onOpenChange: handleOpenChange }}>
      {children}
    </DropdownMenuContext.Provider>
  );
};

const DropdownMenuTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { onOpenChange } = useContext(DropdownMenuContext);

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
DropdownMenuTrigger.displayName = 'DropdownMenuTrigger';

const DropdownMenuContent = React.forwardRef(({ children, align = 'start', ...props }, ref) => {
  const { isOpen, onOpenChange } = useContext(DropdownMenuContext);

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
        <View style={styles.content}>
          <ScrollView style={styles.scrollView}>
            {children}
          </ScrollView>
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
DropdownMenuContent.displayName = 'DropdownMenuContent';

const DropdownMenuItem = React.forwardRef(({ 
  children, 
  onSelect, 
  disabled = false,
  ...props 
}, ref) => {
  const { onOpenChange } = useContext(DropdownMenuContext);

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
      <Text style={[
        styles.menuItemText,
        disabled && styles.menuItemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
DropdownMenuItem.displayName = 'DropdownMenuItem';

const DropdownMenuCheckboxItem = React.forwardRef(({ 
  children, 
  checked, 
  onCheckedChange,
  disabled = false,
  ...props 
}, ref) => {
  const { onOpenChange } = useContext(DropdownMenuContext);

  const handleToggle = () => {
    if (disabled) return;
    if (onCheckedChange) {
      onCheckedChange(!checked);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handleToggle}
      disabled={disabled}
      style={[
        styles.menuItem,
        styles.checkboxItem,
        disabled && styles.menuItemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.checkboxIndicator}>
        {checked && <Check size={16} color="#4F7CFF" />}
      </View>
      <Text style={[
        styles.menuItemText,
        disabled && styles.menuItemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
DropdownMenuCheckboxItem.displayName = 'DropdownMenuCheckboxItem';

const DropdownMenuRadioItem = React.forwardRef(({ 
  children, 
  value,
  checked,
  onSelect,
  disabled = false,
  ...props 
}, ref) => {
  const handleSelect = () => {
    if (disabled) return;
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handleSelect}
      disabled={disabled}
      style={[
        styles.menuItem,
        styles.checkboxItem,
        disabled && styles.menuItemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <View style={[styles.radioIndicator, checked && styles.radioIndicatorChecked]}>
        {checked && <View style={styles.radioDot} />}
      </View>
      <Text style={[
        styles.menuItemText,
        disabled && styles.menuItemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
DropdownMenuRadioItem.displayName = 'DropdownMenuRadioItem';

const DropdownMenuLabel = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.label, props.style]} {...props}>
      {children}
    </Text>
  );
});
DropdownMenuLabel.displayName = 'DropdownMenuLabel';

const DropdownMenuSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.separator, props.style]}
      {...props}
    />
  );
});
DropdownMenuSeparator.displayName = 'DropdownMenuSeparator';

const DropdownMenuGroup = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.group, props.style]} {...props}>
      {children}
    </View>
  );
});
DropdownMenuGroup.displayName = 'DropdownMenuGroup';

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
    minWidth: 200,
    maxWidth: 300,
    maxHeight: 400,
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
  scrollView: {
    maxHeight: 300,
  },
  menuItem: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  menuItemDisabled: {
    opacity: 0.5,
  },
  menuItemText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  menuItemTextDisabled: {
    color: '#9CA3AF',
  },
  checkboxItem: {
    paddingLeft: 8,
  },
  checkboxIndicator: {
    width: 20,
    height: 20,
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIndicator: {
    width: 16,
    height: 16,
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    marginRight: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioIndicatorChecked: {
    borderColor: '#4F7CFF',
  },
  radioDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4F7CFF',
  },
  label: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
  group: {
    paddingVertical: 4,
  },
});

export {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuCheckboxItem,
  DropdownMenuRadioItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuGroup,
};