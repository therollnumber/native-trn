import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native';

const Collapsible = React.forwardRef(({ 
  children, 
  open, 
  onOpenChange,
  ...props 
}, ref) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open !== undefined ? open : internalOpen;
  const animatedHeight = useRef(new Animated.Value(isOpen ? 1 : 0)).current;

  const handleOpenChange = (newOpen) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }

    Animated.timing(animatedHeight, {
      toValue: newOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  };

  return (
    <View ref={ref} style={[styles.collapsible, props.style]} {...props}>
      {React.Children.map(children, (child) => {
        if (child?.type === CollapsibleTrigger) {
          return React.cloneElement(child, { onPress: () => handleOpenChange(!isOpen) });
        }
        if (child?.type === CollapsibleContent) {
          return React.cloneElement(child, { isOpen, animatedHeight });
        }
        return child;
      })}
    </View>
  );
});
Collapsible.displayName = 'Collapsible';

const CollapsibleTrigger = React.forwardRef(({ children, onPress, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[styles.trigger, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
CollapsibleTrigger.displayName = 'CollapsibleTrigger';

const CollapsibleContent = React.forwardRef(({ 
  children, 
  isOpen, 
  animatedHeight,
  ...props 
}, ref) => {
  const [contentHeight, setContentHeight] = useState(0);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.contentContainer,
        {
          height: animatedHeight.interpolate({
            inputRange: [0, 1],
            outputRange: [0, contentHeight],
          }),
          opacity: animatedHeight,
        },
        props.style
      ]}
      {...props}
    >
      <View onLayout={onLayout} style={styles.content}>
        {children}
      </View>
    </Animated.View>
  );
});
CollapsibleContent.displayName = 'CollapsibleContent';

const styles = StyleSheet.create({
  collapsible: {
    overflow: 'hidden',
  },
  trigger: {
    padding: 12,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    width: '100%',
  },
});

export { Collapsible, CollapsibleTrigger, CollapsibleContent };