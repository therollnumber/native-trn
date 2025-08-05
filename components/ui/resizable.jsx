import React, { createContext, useContext, useState, useRef } from 'react';
import {
  View,
  PanGestureHandler,
  StyleSheet,
  Dimensions,
} from 'react-native';
import { GripVertical } from 'lucide-react-native';

const ResizableContext = createContext({});

const ResizablePanelGroup = React.forwardRef(({ 
  children, 
  direction = 'horizontal',
  ...props 
}, ref) => {
  return (
    <ResizableContext.Provider value={{ direction }}>
      <View 
        ref={ref} 
        style={[
          styles.panelGroup,
          direction === 'horizontal' ? styles.horizontal : styles.vertical,
          props.style
        ]} 
        {...props}
      >
        {children}
      </View>
    </ResizableContext.Provider>
  );
});
ResizablePanelGroup.displayName = 'ResizablePanelGroup';

const ResizablePanel = React.forwardRef(({ 
  children, 
  defaultSize = 50,
  minSize = 10,
  maxSize = 90,
  ...props 
}, ref) => {
  const [size, setSize] = useState(defaultSize);
  const { direction } = useContext(ResizableContext);

  const sizeStyle = direction === 'horizontal' 
    ? { width: `${size}%` }
    : { height: `${size}%` };

  return (
    <View 
      ref={ref} 
      style={[
        styles.panel,
        sizeStyle,
        props.style
      ]} 
      {...props}
    >
      {children}
    </View>
  );
});
ResizablePanel.displayName = 'ResizablePanel';

const ResizableHandle = React.forwardRef(({ 
  withHandle = false,
  ...props 
}, ref) => {
  const { direction } = useContext(ResizableContext);
  const panRef = useRef();

  // Simple implementation without gesture handler for now
  // In a full implementation, you'd use react-native-gesture-handler
  
  return (
    <View 
      ref={ref}
      style={[
        styles.handle,
        direction === 'horizontal' ? styles.verticalHandle : styles.horizontalHandle,
        props.style
      ]}
      {...props}
    >
      {withHandle && (
        <View style={styles.handleIndicator}>
          <GripVertical 
            size={16} 
            color="#9CA3AF" 
            style={direction === 'vertical' && { transform: [{ rotate: '90deg' }] }}
          />
        </View>
      )}
    </View>
  );
});
ResizableHandle.displayName = 'ResizableHandle';

// Simplified implementation for mobile
const SimpleResizableContainer = React.forwardRef(({ 
  children,
  leftPanel,
  rightPanel,
  topPanel,
  bottomPanel,
  direction = 'horizontal',
  defaultSplit = 50,
  ...props 
}, ref) => {
  const [splitPercentage, setSplitPercentage] = useState(defaultSplit);
  
  if (direction === 'horizontal') {
    return (
      <View ref={ref} style={[styles.container, props.style]} {...props}>
        <View style={[styles.panel, { width: `${splitPercentage}%` }]}>
          {leftPanel}
        </View>
        <View style={styles.divider} />
        <View style={[styles.panel, { width: `${100 - splitPercentage}%` }]}>
          {rightPanel}
        </View>
      </View>
    );
  }

  return (
    <View ref={ref} style={[styles.container, styles.vertical, props.style]} {...props}>
      <View style={[styles.panel, { height: `${splitPercentage}%` }]}>
        {topPanel}
      </View>
      <View style={[styles.divider, styles.horizontalDivider]} />
      <View style={[styles.panel, { height: `${100 - splitPercentage}%` }]}>
        {bottomPanel}
      </View>
    </View>
  );
});
SimpleResizableContainer.displayName = 'SimpleResizableContainer';

const styles = StyleSheet.create({
  panelGroup: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  horizontal: {
    flexDirection: 'row',
  },
  vertical: {
    flexDirection: 'column',
  },
  panel: {
    flex: 1,
    overflow: 'hidden',
  },
  handle: {
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 10,
  },
  verticalHandle: {
    width: 8,
    height: '100%',
    cursor: 'col-resize',
  },
  horizontalHandle: {
    width: '100%',
    height: 8,
    cursor: 'row-resize',
  },
  handleIndicator: {
    backgroundColor: '#F3F4F6',
    borderRadius: 4,
    padding: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  divider: {
    width: 1,
    backgroundColor: '#E5E7EB',
  },
  horizontalDivider: {
    width: '100%',
    height: 1,
  },
});

export {
  ResizablePanelGroup,
  ResizablePanel,
  ResizableHandle,
  SimpleResizableContainer,
};