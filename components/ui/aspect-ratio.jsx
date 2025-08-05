import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const AspectRatio = React.forwardRef(({ 
  children, 
  ratio = 1, 
  ...props 
}, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.container, props.style]}
      {...props}
    >
      <View style={[styles.content, { aspectRatio: ratio }]}>
        {children}
      </View>
    </View>
  );
});
AspectRatio.displayName = 'AspectRatio';

const styles = StyleSheet.create({
  container: {
    width: '100%',
  },
  content: {
    width: '100%',
    overflow: 'hidden',
  },
});

export { AspectRatio };