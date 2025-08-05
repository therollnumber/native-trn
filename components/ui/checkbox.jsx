import React from 'react';
import {
  TouchableOpacity,
  View,
  StyleSheet,
} from 'react-native';
import { Check } from 'lucide-react-native';

const Checkbox = React.forwardRef(({ checked, onCheckedChange, disabled, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => onCheckedChange && onCheckedChange(!checked)}
      disabled={disabled}
      style={[
        styles.checkbox,
        checked && styles.checkboxChecked,
        disabled && styles.checkboxDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {checked && (
        <Check 
          size={14} 
          color={disabled ? '#9CA3AF' : '#ffffff'} 
        />
      )}
    </TouchableOpacity>
  );
});
Checkbox.displayName = 'Checkbox';

const styles = StyleSheet.create({
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#4F7CFF',
    borderColor: '#4F7CFF',
  },
  checkboxDisabled: {
    opacity: 0.5,
  },
});

export { Checkbox };