import React, { createContext, useContext } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const RadioGroupContext = createContext({});

const RadioGroup = React.forwardRef(({ 
  children, 
  value, 
  onValueChange, 
  disabled = false,
  ...props 
}, ref) => {
  return (
    <RadioGroupContext.Provider value={{ value, onValueChange, disabled }}>
      <View ref={ref} style={[styles.radioGroup, props.style]} {...props}>
        {children}
      </View>
    </RadioGroupContext.Provider>
  );
});
RadioGroup.displayName = 'RadioGroup';

const RadioGroupItem = React.forwardRef(({ 
  value, 
  disabled: itemDisabled = false,
  ...props 
}, ref) => {
  const { value: groupValue, onValueChange, disabled: groupDisabled } = useContext(RadioGroupContext);
  const isChecked = groupValue === value;
  const isDisabled = groupDisabled || itemDisabled;

  const handlePress = () => {
    if (!isDisabled && onValueChange) {
      onValueChange(value);
    }
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      disabled={isDisabled}
      style={[
        styles.radioItem,
        isChecked && styles.radioItemChecked,
        isDisabled && styles.radioItemDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <View style={[
        styles.radioButton,
        isChecked && styles.radioButtonChecked,
        isDisabled && styles.radioButtonDisabled
      ]}>
        {isChecked && (
          <View style={[
            styles.radioIndicator,
            isDisabled && styles.radioIndicatorDisabled
          ]} />
        )}
      </View>
    </TouchableOpacity>
  );
});
RadioGroupItem.displayName = 'RadioGroupItem';

const RadioGroupIndicator = React.forwardRef(({ ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.indicator, props.style]}
      {...props}
    />
  );
});
RadioGroupIndicator.displayName = 'RadioGroupIndicator';

const styles = StyleSheet.create({
  radioGroup: {
    gap: 12,
  },
  radioItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 4,
  },
  radioItemChecked: {
    // Additional styles for checked state if needed
  },
  radioItemDisabled: {
    opacity: 0.5,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#D1D5DB',
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonChecked: {
    borderColor: '#4F7CFF',
  },
  radioButtonDisabled: {
    borderColor: '#E5E7EB',
    backgroundColor: '#F9FAFB',
  },
  radioIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4F7CFF',
  },
  radioIndicatorDisabled: {
    backgroundColor: '#9CA3AF',
  },
  indicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4F7CFF',
  },
});

export { RadioGroup, RadioGroupItem, RadioGroupIndicator };