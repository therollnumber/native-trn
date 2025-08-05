import React from 'react';
import {
  ScrollView,
  View,
  StyleSheet,
} from 'react-native';

const ScrollArea = React.forwardRef(({ 
  children, 
  orientation = 'vertical',
  scrollHideDelay = 600,
  ...props 
}, ref) => {
  const scrollProps = {
    showsVerticalScrollIndicator: orientation === 'vertical',
    showsHorizontalScrollIndicator: orientation === 'horizontal',
    horizontal: orientation === 'horizontal',
    ...props,
  };

  return (
    <ScrollView
      ref={ref}
      style={[styles.scrollArea, props.style]}
      contentContainerStyle={styles.scrollContent}
      bounces={false}
      {...scrollProps}
    >
      {children}
    </ScrollView>
  );
});
ScrollArea.displayName = 'ScrollArea';

const ScrollBar = React.forwardRef(({ 
  orientation = 'vertical',
  ...props 
}, ref) => {
  return (
    <View
      ref={ref}
      style={[
        styles.scrollBar,
        orientation === 'horizontal' ? styles.horizontalScrollBar : styles.verticalScrollBar,
        props.style
      ]}
      {...props}
    />
  );
});
ScrollBar.displayName = 'ScrollBar';

const Viewport = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.viewport, props.style]} {...props}>
      {children}
    </View>
  );
});
Viewport.displayName = 'Viewport';

const styles = StyleSheet.create({
  scrollArea: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  scrollBar: {
    position: 'absolute',
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderRadius: 4,
  },
  verticalScrollBar: {
    right: 2,
    top: 2,
    bottom: 2,
    width: 8,
  },
  horizontalScrollBar: {
    left: 2,
    right: 2,
    bottom: 2,
    height: 8,
  },
  viewport: {
    flex: 1,
    overflow: 'hidden',
  },
});

export { ScrollArea, ScrollBar, Viewport };