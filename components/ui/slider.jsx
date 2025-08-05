import React, { useState } from 'react';
import {
  View,
  Text,
  PanGestureHandler,
  StyleSheet,
  Dimensions,
} from 'react-native';

const Slider = React.forwardRef(({ 
  value = [50],
  onValueChange,
  disabled = false,
  orientation = 'horizontal',
  min = 0,
  max = 100,
  step = 1,
  minStepsBetweenThumbs = 0,
  ...props 
}, ref) => {
  const [internalValue, setInternalValue] = useState(value);
  const currentValue = value !== undefined ? value : internalValue;
  const screenWidth = Dimensions.get('window').width - 32;
  const sliderWidth = orientation === 'horizontal' ? screenWidth : 200;
  const sliderHeight = orientation === 'horizontal' ? 20 : screenWidth;

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  const getThumbPosition = (val) => {
    const percentage = (val - min) / (max - min);
    return percentage * (sliderWidth - 20);
  };

  const getValueFromPosition = (position) => {
    const percentage = position / (sliderWidth - 20);
    const rawValue = min + percentage * (max - min);
    return Math.round(rawValue / step) * step;
  };

  // Simple implementation without pan gesture for now
  const handlePress = (event) => {
    if (disabled) return;
    
    const { locationX } = event.nativeEvent;
    const newValue = getValueFromPosition(locationX);
    const clampedValue = Math.min(Math.max(newValue, min), max);
    
    handleValueChange([clampedValue]);
  };

  return (
    <View ref={ref} style={[styles.container, props.style]} {...props}>
      <View 
        style={[
          styles.track, 
          orientation === 'vertical' && styles.trackVertical,
          { width: sliderWidth, height: orientation === 'horizontal' ? 4 : sliderHeight }
        ]}
        onStartShouldSetResponder={() => true}
        onResponderGrant={handlePress}
      >
        {/* Progress Track */}
        <View 
          style={[
            styles.range,
            orientation === 'vertical' && styles.rangeVertical,
            {
              width: orientation === 'horizontal' ? getThumbPosition(currentValue[0]) + 10 : 4,
              height: orientation === 'horizontal' ? 4 : getThumbPosition(currentValue[0]) + 10,
            }
          ]} 
        />
        
        {/* Thumb */}
        {currentValue.map((val, index) => (
          <View
            key={index}
            style={[
              styles.thumb,
              disabled && styles.thumbDisabled,
              {
                left: orientation === 'horizontal' ? getThumbPosition(val) : -6,
                top: orientation === 'horizontal' ? -6 : getThumbPosition(val),
              }
            ]}
          />
        ))}
      </View>
      
      {/* Value Display */}
      <Text style={styles.valueText}>{currentValue[0]}</Text>
    </View>
  );
});
Slider.displayName = 'Slider';

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  track: {
    backgroundColor: '#E5E7EB',
    borderRadius: 2,
    position: 'relative',
  },
  trackVertical: {
    width: 4,
  },
  range: {
    backgroundColor: '#4F7CFF',
    borderRadius: 2,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  rangeVertical: {
    bottom: 0,
    top: 'auto',
  },
  thumb: {
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#4F7CFF',
    position: 'absolute',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  thumbDisabled: {
    backgroundColor: '#F9FAFB',
    borderColor: '#D1D5DB',
  },
  valueText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 8,
  },
});

export { Slider };