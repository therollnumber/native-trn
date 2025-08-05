import React from 'react';
import {
  TextInput,
  StyleSheet,
} from 'react-native';

const Textarea = React.forwardRef(({ placeholder, value, onChangeText, ...props }, ref) => {
  return (
    <TextInput
      ref={ref}
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      multiline={true}
      numberOfLines={4}
      textAlignVertical="top"
      style={[styles.textarea, props.style]}
      placeholderTextColor="#9CA3AF"
      {...props}
    />
  );
});
Textarea.displayName = 'Textarea';

const styles = StyleSheet.create({
  textarea: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 6,
    padding: 12,
    fontSize: 14,
    color: '#111827',
    backgroundColor: '#ffffff',
    minHeight: 80,
  },
});

export { Textarea };