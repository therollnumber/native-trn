import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Card = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.card, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
Card.displayName = 'Card';

const CardHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.cardHeader, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
CardHeader.displayName = 'CardHeader';

const CardTitle = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.cardTitle, props.style]}
      {...props}
    >
      {children}
    </Text>
  );
});
CardTitle.displayName = 'CardTitle';

const CardDescription = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text
      ref={ref}
      style={[styles.cardDescription, props.style]}
      {...props}
    >
      {children}
    </Text>
  );
});
CardDescription.displayName = 'CardDescription';

const CardContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.cardContent, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
CardContent.displayName = 'CardContent';

const CardFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.cardFooter, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
CardFooter.displayName = 'CardFooter';

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    padding: 24,
    paddingBottom: 16,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  cardDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  cardContent: {
    paddingHorizontal: 24,
    paddingVertical: 0,
  },
  cardFooter: {
    padding: 24,
    paddingTop: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

export { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter };