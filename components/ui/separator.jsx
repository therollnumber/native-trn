import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const Separator = React.forwardRef(({ orientation = 'horizontal', decorative = true, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[
        styles.separator,
        orientation === 'vertical' ? styles.separatorVertical : styles.separatorHorizontal,
        props.style
      ]}
      {...props}
    />
  );
});
Separator.displayName = 'Separator';

const styles = StyleSheet.create({
  separator: {
    backgroundColor: '#E5E7EB',
  },
  separatorHorizontal: {
    height: 1,
    width: '100%',
  },
  separatorVertical: {
    width: 1,
    height: '100%',
  },
});

export { Separator };