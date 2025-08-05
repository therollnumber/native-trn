import React from 'react';
import {
  View,
  StyleSheet,
} from 'react-native';

const Progress = React.forwardRef(({ value = 0, max = 100, ...props }, ref) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100);

  return (
    <View
      ref={ref}
      style={[styles.progressContainer, props.style]}
      {...props}
    >
      <View
        style={[
          styles.progressBar,
          { width: `${percentage}%` }
        ]}
      />
    </View>
  );
});
Progress.displayName = 'Progress';

const styles = StyleSheet.create({
  progressContainer: {
    height: 8,
    backgroundColor: '#E5E7EB',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4F7CFF',
    borderRadius: 4,
  },
});

export { Progress };