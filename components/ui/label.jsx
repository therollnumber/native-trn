import React from 'react';
import {
  Text,
  StyleSheet,
} from 'react-native';

const Label = React.forwardRef(({ children, required, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.label, props.style]}
      {...props}
    >
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
});
Label.displayName = 'Label';

const styles = StyleSheet.create({
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#DC2626',
  },
});

export { Label };