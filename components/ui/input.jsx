import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const Input = React.forwardRef(({ 
  placeholder, 
  value, 
  onChangeText, 
  secureTextEntry = false,
  keyboardType = 'default',
  autoCapitalize = 'none',
  multiline = false,
  numberOfLines = 1,
  editable = true,
  ...props 
}, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      autoCapitalize={autoCapitalize}
      multiline={multiline}
      numberOfLines={numberOfLines}
      editable={editable}
      style={[
        styles.input,
        !editable && styles.inputDisabled,
        props.style
      ]}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
});
Input.displayName = 'Input';

const styles = StyleSheet.create({
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    paddingHorizontal: 12,
    paddingVertical: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#ffffff',
    minHeight: 44,
  },
  inputDisabled: {
    backgroundColor: '#F9FAFB',
    color: '#9CA3AF',
  },
});

export { Input };