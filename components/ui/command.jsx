import React, { useState, createContext, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from 'react-native';
import { Search } from 'lucide-react-native';

const CommandContext = createContext({});

const Command = React.forwardRef(({ children, value, onValueChange, ...props }, ref) => {
  const [internalValue, setInternalValue] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <CommandContext.Provider value={{ 
      value: currentValue, 
      onValueChange: handleValueChange,
      searchTerm,
      setSearchTerm 
    }}>
      <View ref={ref} style={[styles.command, props.style]} {...props}>
        {children}
      </View>
    </CommandContext.Provider>
  );
});
Command.displayName = 'Command';

const CommandInput = React.forwardRef(({ placeholder = "Search...", ...props }, ref) => {
  const { searchTerm, setSearchTerm } = useContext(CommandContext);

  return (
    <View style={styles.inputContainer}>
      <Search size={16} color="#9CA3AF" style={styles.searchIcon} />
      <TextInput
        ref={ref}
        value={searchTerm}
        onChangeText={setSearchTerm}
        placeholder={placeholder}
        placeholderTextColor="#9CA3AF"
        style={[styles.input, props.style]}
        {...props}
      />
    </View>
  );
});
CommandInput.displayName = 'CommandInput';

const CommandList = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.list, props.style]} {...props}>
      {children}
    </View>
  );
});
CommandList.displayName = 'CommandList';

const CommandEmpty = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.empty, props.style]} {...props}>
      <Text style={styles.emptyText}>
        {children || "No results found."}
      </Text>
    </View>
  );
});
CommandEmpty.displayName = 'CommandEmpty';

const CommandGroup = React.forwardRef(({ children, heading, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.group, props.style]} {...props}>
      {heading && (
        <Text style={styles.groupHeading}>{heading}</Text>
      )}
      {children}
    </View>
  );
});
CommandGroup.displayName = 'CommandGroup';

const CommandItem = React.forwardRef(({ 
  children, 
  value,
  onSelect,
  disabled = false,
  ...props 
}, ref) => {
  const { onValueChange, searchTerm } = useContext(CommandContext);

  const handleSelect = () => {
    if (disabled) return;
    if (onSelect) {
      onSelect(value);
    }
    if (onValueChange) {
      onValueChange(value);
    }
  };

  // Simple search filtering
  const shouldShow = !searchTerm || 
    (typeof children === 'string' && children.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (value && value.toLowerCase().includes(searchTerm.toLowerCase()));

  if (!shouldShow) return null;

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handleSelect}
      disabled={disabled}
      style={[
        styles.item,
        disabled && styles.itemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.itemText,
        disabled && styles.itemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
CommandItem.displayName = 'CommandItem';

const CommandSeparator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.separator, props.style]}
      {...props}
    />
  );
});
CommandSeparator.displayName = 'CommandSeparator';

const styles = StyleSheet.create({
  command: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    overflow: 'hidden',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  searchIcon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 14,
    color: '#111827',
  },
  list: {
    maxHeight: 300,
  },
  empty: {
    padding: 24,
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 14,
    color: '#6B7280',
  },
  group: {
    paddingVertical: 8,
  },
  groupHeading: {
    fontSize: 12,
    fontWeight: '600',
    color: '#9CA3AF',
    textTransform: 'uppercase',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  item: {
    paddingHorizontal: 12,
    paddingVertical: 10,
  },
  itemDisabled: {
    opacity: 0.5,
  },
  itemText: {
    fontSize: 14,
    color: '#111827',
  },
  itemTextDisabled: {
    color: '#9CA3AF',
  },
  separator: {
    height: 1,
    backgroundColor: '#E5E7EB',
    marginVertical: 4,
  },
});

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandSeparator,
};