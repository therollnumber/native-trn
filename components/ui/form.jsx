import React, { createContext, useContext } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const FormContext = createContext({});

const Form = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <FormContext.Provider value={{}}>
      <View ref={ref} style={[styles.form, props.style]} {...props}>
        {children}
      </View>
    </FormContext.Provider>
  );
});
Form.displayName = 'Form';

const FormItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.formItem, props.style]} {...props}>
      {children}
    </View>
  );
});
FormItem.displayName = 'FormItem';

const FormLabel = React.forwardRef(({ children, required, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.formLabel, props.style]} {...props}>
      {children}
      {required && <Text style={styles.required}> *</Text>}
    </Text>
  );
});
FormLabel.displayName = 'FormLabel';

const FormControl = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.formControl, props.style]} {...props}>
      {children}
    </View>
  );
});
FormControl.displayName = 'FormControl';

const FormDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.formDescription, props.style]} {...props}>
      {children}
    </Text>
  );
});
FormDescription.displayName = 'FormDescription';

const FormMessage = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.formMessage, props.style]} {...props}>
      {children}
    </Text>
  );
});
FormMessage.displayName = 'FormMessage';

const styles = StyleSheet.create({
  form: {
    width: '100%',
  },
  formItem: {
    marginBottom: 16,
  },
  formLabel: {
    fontSize: 14,
    fontWeight: '500',
    color: '#374151',
    marginBottom: 6,
  },
  required: {
    color: '#DC2626',
  },
  formControl: {
    marginBottom: 4,
  },
  formDescription: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
  },
  formMessage: {
    fontSize: 12,
    color: '#DC2626',
    marginTop: 4,
  },
});

export {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
};