import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Alert = React.forwardRef(({ children, variant = 'default', ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        styles.alert,
        variant === 'destructive' && styles.alertDestructive,
        props.style
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
Alert.displayName = 'Alert';

const AlertTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.alertTitle, props.style]}
      {...props}
    >
      {children}
    </Text>
  );
});
AlertTitle.displayName = 'AlertTitle';

const AlertDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.alertDescription, props.style]}
      {...props}
    >
      {children}
    </Text>
  );
});
AlertDescription.displayName = 'AlertDescription';

const styles = StyleSheet.create({
  alert: {
    borderRadius: 6,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    backgroundColor: '#ffffff',
    padding: 16,
    marginVertical: 4,
  },
  alertDestructive: {
    borderColor: '#FCA5A5',
    backgroundColor: '#FEF2F2',
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export { Alert, AlertTitle, AlertDescription };