import React from 'react';
import {
  View,
  ActivityIndicator,
  Text,
  StyleSheet,
} from 'react-native';

const Loader = React.forwardRef(({ 
  size = 'large', 
  color = '#4F7CFF', 
  text,
  ...props 
}, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.container, props.style]}
      {...props}
    >
      <ActivityIndicator size={size} color={color} />
      {text && (
        <Text style={styles.text}>
          {text}
        </Text>
      )}
    </View>
  );
});
Loader.displayName = 'Loader';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    marginTop: 12,
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
});

export { Loader };