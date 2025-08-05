import React from 'react';
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';

const Button = React.forwardRef(({ 
  children, 
  variant = 'default', 
  size = 'default',
  disabled = false,
  loading = false,
  onPress,
  ...props 
}, ref) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'destructive':
        return styles.buttonDestructive;
      case 'outline':
        return styles.buttonOutline;
      case 'secondary':
        return styles.buttonSecondary;
      case 'ghost':
        return styles.buttonGhost;
      case 'link':
        return styles.buttonLink;
      default:
        return styles.buttonDefault;
    }
  };

  const getSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.buttonSm;
      case 'lg':
        return styles.buttonLg;
      case 'icon':
        return styles.buttonIcon;
      default:
        return styles.buttonDefault;
    }
  };

  const getTextVariantStyle = () => {
    switch (variant) {
      case 'destructive':
        return styles.buttonTextDestructive;
      case 'outline':
        return styles.buttonTextOutline;
      case 'secondary':
        return styles.buttonTextSecondary;
      case 'ghost':
        return styles.buttonTextGhost;
      case 'link':
        return styles.buttonTextLink;
      default:
        return styles.buttonTextDefault;
    }
  };

  const getTextSizeStyle = () => {
    switch (size) {
      case 'sm':
        return styles.buttonTextSm;
      case 'lg':
        return styles.buttonTextLg;
      default:
        return styles.buttonTextDefault;
    }
  };

  const isDisabled = disabled || loading;

  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      disabled={isDisabled}
      style={[
        styles.button,
        getVariantStyle(),
        getSizeStyle(),
        isDisabled && styles.buttonDisabled,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'outline' || variant === 'ghost' ? '#374151' : '#ffffff'} 
        />
      ) : (
        <Text style={[
          styles.buttonText,
          getTextVariantStyle(),
          getTextSizeStyle(),
          isDisabled && styles.buttonTextDisabled
        ]}>
          {children}
        </Text>
      )}
    </TouchableOpacity>
  );
});
Button.displayName = 'Button';

const styles = StyleSheet.create({
  button: {
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 44,
  },
  buttonDefault: {
    backgroundColor: '#111827',
  },
  buttonDestructive: {
    backgroundColor: '#DC2626',
  },
  buttonOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  buttonSecondary: {
    backgroundColor: '#F3F4F6',
  },
  buttonGhost: {
    backgroundColor: 'transparent',
  },
  buttonLink: {
    backgroundColor: 'transparent',
  },
  buttonSm: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    minHeight: 36,
  },
  buttonLg: {
    paddingVertical: 16,
    paddingHorizontal: 24,
    minHeight: 52,
  },
  buttonIcon: {
    width: 44,
    height: 44,
    paddingVertical: 0,
    paddingHorizontal: 0,
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'center',
  },
  buttonTextDefault: {
    color: '#ffffff',
  },
  buttonTextDestructive: {
    color: '#ffffff',
  },
  buttonTextOutline: {
    color: '#374151',
  },
  buttonTextSecondary: {
    color: '#374151',
  },
  buttonTextGhost: {
    color: '#374151',
  },
  buttonTextLink: {
    color: '#4F7CFF',
    textDecorationLine: 'underline',
  },
  buttonTextSm: {
    fontSize: 12,
  },
  buttonTextLg: {
    fontSize: 16,
  },
  buttonTextDisabled: {
    opacity: 0.7,
  },
});

export { Button };