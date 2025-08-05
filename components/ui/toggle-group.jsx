import React, { createContext, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const ToggleGroupContext = createContext({});

const ToggleGroup = React.forwardRef(({ 
  children,
  type = 'single',
  value,
  onValueChange,
  disabled = false,
  orientation = 'horizontal',
  ...props 
}, ref) => {
  return (
    <ToggleGroupContext.Provider value={{
      type,
      value,
      onValueChange,
      disabled,
    }}>
      <View
        ref={ref}
        style={[
          styles.toggleGroup,
          orientation === 'vertical' && styles.toggleGroupVertical,
          props.style
        ]}
        {...props}
      >
        {children}
      </View>
    </ToggleGroupContext.Provider>
  );
});
ToggleGroup.displayName = 'ToggleGroup';

const ToggleGroupItem = React.forwardRef(({ 
  children,
  value,
  disabled: itemDisabled = false,
  ...props 
}, ref) => {
  const { 
    type, 
    value: groupValue, 
    onValueChange, 
    disabled: groupDisabled 
  } = useContext(ToggleGroupContext);
  
  const isDisabled = groupDisabled || itemDisabled;
  const isPressed = type === 'single' 
    ? groupValue === value
    : Array.isArray(groupValue) && groupValue.includes(value);

  const handlePress = () => {
    if (isDisabled || !onValueChange) return;

    if (type === 'single') {
      onValueChange(isPressed ? undefined : value);
    } else {
      const currentValue = Array.isArray(groupValue) ? groupValue : [];
      if (isPressed) {
        onValueChange(currentValue.filter(v => v !== value));
      } else {
        onValueChange([...currentValue, value]);
      }
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.toggleGroupItem,
        isPressed && styles.toggleGroupItemPressed,
        isDisabled && styles.toggleGroupItemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.toggleGroupItemText,
        isPressed && styles.toggleGroupItemTextPressed,
        isDisabled && styles.toggleGroupItemTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
ToggleGroupItem.displayName = 'ToggleGroupItem';

const styles = StyleSheet.create({
  toggleGroup: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    padding: 2,
  },
  toggleGroupVertical: {
    flexDirection: 'column',
  },
  toggleGroupItem: {
    flex: 1,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 36,
  },
  toggleGroupItemPressed: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 1,
  },
  toggleGroupItemDisabled: {
    opacity: 0.5,
  },
  toggleGroupItemText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  toggleGroupItemTextPressed: {
    color: '#111827',
  },
  toggleGroupItemTextDisabled: {
    color: '#9CA3AF',
  },
});

export { ToggleGroup, ToggleGroupItem };