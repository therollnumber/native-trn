import React from 'react';
import {
  Switch as RNSwitch,
  StyleSheet,
} from 'react-native';

const Switch = React.forwardRef(({ checked, onCheckedChange, disabled, ...props }, ref) => {
  return (
    <RNSwitch
      ref={ref}
      value={checked}
      onValueChange={onCheckedChange}
      disabled={disabled}
      trackColor={{ false: '#E5E7EB', true: '#4F7CFF' }}
      thumbColor="#ffffff"
      ios_backgroundColor="#E5E7EB"
      style={[styles.switch, props.style]}
      {...props}
    />
  );
});
Switch.displayName = 'Switch';

const styles = StyleSheet.create({
  switch: {
    transform: [{ scaleX: 1.1 }, { scaleY: 1.1 }],
  },
});

export { Switch };