import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { ChevronDown } from 'lucide-react-native';

const AccordionContext = createContext({});

const Accordion = React.forwardRef(({ 
  children, 
  type = 'single', 
  collapsible = false,
  value,
  onValueChange,
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = useState(type === 'multiple' ? [] : '');
  const currentValue = value !== undefined ? value : internalValue;

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <AccordionContext.Provider value={{ 
      type, 
      collapsible, 
      value: currentValue, 
      onValueChange: handleValueChange 
    }}>
      <View ref={ref} style={[styles.accordion, props.style]} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
});
Accordion.displayName = 'Accordion';

const AccordionItem = React.forwardRef(({ children, value, ...props }, ref) => {
  return (
    <AccordionContext.Provider value={{ itemValue: value }}>
      <View ref={ref} style={[styles.accordionItem, props.style]} {...props}>
        {children}
      </View>
    </AccordionContext.Provider>
  );
});
AccordionItem.displayName = 'AccordionItem';

const AccordionTrigger = React.forwardRef(({ children, ...props }, ref) => {
  const { type, value, onValueChange, itemValue } = useContext(AccordionContext);
  const rotateAnim = React.useRef(new Animated.Value(0)).current;
  
  const isOpen = type === 'multiple' 
    ? value.includes(itemValue)
    : value === itemValue;

  React.useEffect(() => {
    Animated.timing(rotateAnim, {
      toValue: isOpen ? 1 : 0,
      duration: 200,
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handlePress = () => {
    if (type === 'multiple') {
      const newValue = value.includes(itemValue)
        ? value.filter(v => v !== itemValue)
        : [...value, itemValue];
      onValueChange(newValue);
    } else {
      const newValue = value === itemValue ? '' : itemValue;
      onValueChange(newValue);
    }
  };

  const rotateInterpolate = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '180deg'],
  });

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      style={[styles.trigger, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      <View style={styles.triggerContent}>
        <Text style={styles.triggerText}>{children}</Text>
        <Animated.View style={{ transform: [{ rotate: rotateInterpolate }] }}>
          <ChevronDown size={20} color="#6B7280" />
        </Animated.View>
      </View>
    </TouchableOpacity>
  );
});
AccordionTrigger.displayName = 'AccordionTrigger';

const AccordionContent = React.forwardRef(({ children, ...props }, ref) => {
  const { type, value, itemValue } = useContext(AccordionContext);
  const [contentHeight, setContentHeight] = useState(0);
  const heightAnim = React.useRef(new Animated.Value(0)).current;
  
  const isOpen = type === 'multiple' 
    ? value.includes(itemValue)
    : value === itemValue;

  React.useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isOpen ? contentHeight : 0,
      duration: 200,
      useNativeDriver: false,
    }).start();
  }, [isOpen, contentHeight]);

  const onLayout = (event) => {
    const { height } = event.nativeEvent.layout;
    setContentHeight(height);
  };

  return (
    <Animated.View
      ref={ref}
      style={[
        styles.contentContainer,
        { height: heightAnim },
        props.style
      ]}
      {...props}
    >
      <View onLayout={onLayout} style={styles.content}>
        <Text style={styles.contentText}>{children}</Text>
      </View>
    </Animated.View>
  );
});
AccordionContent.displayName = 'AccordionContent';

const styles = StyleSheet.create({
  accordion: {
    backgroundColor: '#ffffff',
    borderRadius: 8,
    overflow: 'hidden',
  },
  accordionItem: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  trigger: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  triggerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  triggerText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#111827',
    flex: 1,
  },
  contentContainer: {
    overflow: 'hidden',
  },
  content: {
    position: 'absolute',
    width: '100%',
    paddingHorizontal: 16,
    paddingBottom: 16,
  },
  contentText: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
});

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent };