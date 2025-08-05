import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  FlatList,
  StyleSheet,
} from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';

const SelectContext = createContext({});

const Select = React.forwardRef(({ 
  children, 
  value, 
  onValueChange,
  disabled = false,
  ...props 
}, ref) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <SelectContext.Provider value={{ 
      value, 
      onValueChange, 
      disabled, 
      isOpen, 
      setIsOpen 
    }}>
      <View ref={ref} style={[styles.select, props.style]} {...props}>
        {children}
      </View>
    </SelectContext.Provider>
  );
});
Select.displayName = 'Select';

const SelectTrigger = React.forwardRef(({ children, placeholder, ...props }, ref) => {
  const { value, disabled, isOpen, setIsOpen } = useContext(SelectContext);

  const handlePress = () => {
    if (!disabled) {
      setIsOpen(true);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.trigger,
        disabled && styles.triggerDisabled,
        isOpen && styles.triggerOpen,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.triggerContent}>
        <Text style={[
          styles.triggerText,
          !value && styles.placeholderText,
          disabled && styles.triggerTextDisabled
        ]}>
          {children || placeholder || 'Select...'}
        </Text>
        <ChevronDown 
          size={16} 
          color={disabled ? '#9CA3AF' : '#6B7280'} 
          style={[styles.chevron, isOpen && styles.chevronOpen]}
        />
      </View>
    </TouchableOpacity>
  );
});
SelectTrigger.displayName = 'SelectTrigger';

const SelectValue = React.forwardRef(({ placeholder, ...props }, ref) => {
  const { value } = useContext(SelectContext);
  
  return (
    <Text
      ref={ref}
      style={[
        styles.triggerText,
        !value && styles.placeholderText,
        props.style
      ]}
      {...props}
    >
      {value || placeholder}
    </Text>
  );
});
SelectValue.displayName = 'SelectValue';

const SelectContent = React.forwardRef(({ children, position = 'popper', ...props }, ref) => {
  const { isOpen, setIsOpen } = useContext(SelectContext);

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
        <View style={styles.content}>
          {children}
        </View>
      </TouchableOpacity>
    </Modal>
  );
});
SelectContent.displayName = 'SelectContent';

const SelectItem = React.forwardRef(({ 
  children, 
  value, 
  disabled = false,
  ...props 
}, ref) => {
  const { value: selectedValue, onValueChange, setIsOpen } = useContext(SelectContext);
  const isSelected = selectedValue === value;

  const handleSelect = () => {
    if (!disabled) {
      if (onValueChange) {
        onValueChange(value);
      }
      setIsOpen(false);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handleSelect}
      disabled={disabled}
      style={[
        styles.item,
        isSelected && styles.itemSelected,
        disabled && styles.itemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.itemText,
        isSelected && styles.itemTextSelected,
        disabled && styles.itemTextDisabled
      ]}>
        {children}
      </Text>
      {isSelected && (
        <Check size={16} color="#4F7CFF" />
      )}
    </TouchableOpacity>
  );
});
SelectItem.displayName = 'SelectItem';

const SelectLabel = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.label, props.style]} {...props}>
      {children}
    </Text>
  );
});
SelectLabel.displayName = 'SelectLabel';

const SelectSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.separator, props.style]}
      {...props}
    />
  );
});
SelectSeparator.displayName = 'SelectSeparator';

const SelectGroup = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.group, props.style]} {...props}>
      {children}
    </View>
  );
});
SelectGroup.displayName = 'SelectGroup';

const styles = StyleSheet.create({
  select: {
    position: 'relative',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 6,
    backgroundColor: '#ffffff',
    minHeight: 40,
  },
  triggerDisabled: {
    opacity: 0.5,
    backgroundColor: '#F9FAFB',
  },
  triggerOpen: {
    borderColor: '#4F7CFF',
  },
  triggerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    flex: 1,
  },
  triggerText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  triggerTextDisabled: {
    color: '#9CA3AF',
  },
  placeholderText: {
    color: '#9CA3AF',
  },
  chevron: {
    marginLeft: 8,
    transform: [{ rotate: '0deg' }],
  },
  chevronOpen: {
    transform: [{ rotate: '180deg' }],
  },
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    minWidth: 200,
    maxWidth: 300,
    maxHeight: 300,
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
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemSelected: {
    backgroundColor: '#F3F4F6',
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
    color: '#111827',
    flex: 1,
  },
  itemTextSelected: {
    color: '#4F7CFF',
    fontWeight: '500',
  },
  itemTextDisabled: {
    color: '#9CA3AF',
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
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
  SelectLabel,
  SelectSeparator,
  SelectGroup,
};