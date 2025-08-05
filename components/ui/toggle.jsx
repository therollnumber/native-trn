import React, { useState } from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const Toggle = React.forwardRef(({ 
  children,
  pressed,
  onPressedChange,
  disabled = false,
  variant = 'default',
  size = 'default',
  ...props 
}, ref) => {
  const [internalPressed, setInternalPressed] = useState(false);
  const isPressed = pressed !== undefined ? pressed : internalPressed;

  const handlePress = () => {
    if (disabled) return;
    
    if (onPressedChange) {
      onPressedChange(!isPressed);
    } else {
      setInternalPressed(!isPressed);
    }
  };

  const getSizeStyles = () => {
    switch (size) {
      case 'sm':
        return {
          paddingHorizontal: 8,
          paddingVertical: 6,
          minHeight: 32,
        };
      case 'lg':
        return {
          paddingHorizontal: 16,
          paddingVertical: 12,
          minHeight: 44,
        };
      default:
        return {
          paddingHorizontal: 12,
          paddingVertical: 8,
          minHeight: 36,
        };
    }
  };

  const getVariantStyles = () => {
    if (variant === 'outline') {
      return {
        backgroundColor: isPressed ? '#F3F4F6' : 'transparent',
        borderWidth: 1,
        borderColor: isPressed ? '#D1D5DB' : '#E5E7EB',
      };
    }
    
    return {
      backgroundColor: isPressed ? '#F3F4F6' : 'transparent',
    };
  };

  const getTextStyles = () => {
    const baseTextStyle = {
      fontSize: size === 'sm' ? 12 : size === 'lg' ? 16 : 14,
      fontWeight: '500',
    };

    if (variant === 'outline') {
      return {
        ...baseTextStyle,
        color: isPressed ? '#111827' : '#6B7280',
      };
    }

    return {
      ...baseTextStyle,
      color: isPressed ? '#111827' : '#6B7280',
    };
  };

  return (
    <TouchableOpacity
      ref={ref}
      onPress={handlePress}
      disabled={disabled}
      style={[
        styles.toggle,
        getSizeStyles(),
        getVariantStyles(),
        disabled && styles.toggleDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        getTextStyles(),
        disabled && styles.toggleTextDisabled
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
Toggle.displayName = 'Toggle';

const styles = StyleSheet.create({
  toggle: {
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
    transition: 'all 0.2s',
  },
  toggleDisabled: {
    opacity: 0.5,
  },
  toggleTextDisabled: {
    color: '#9CA3AF',
  },
});

export { Toggle };