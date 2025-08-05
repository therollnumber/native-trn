import React from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';

const Badge = React.forwardRef(({ children, variant = 'default', ...props }, ref) => {
  const getVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.badgeSecondary;
      case 'destructive':
        return styles.badgeDestructive;
      case 'outline':
        return styles.badgeOutline;
      default:
        return styles.badgeDefault;
    }
  };

  const getTextVariantStyle = () => {
    switch (variant) {
      case 'secondary':
        return styles.badgeTextSecondary;
      case 'destructive':
        return styles.badgeTextDestructive;
      case 'outline':
        return styles.badgeTextOutline;
      default:
        return styles.badgeTextDefault;
    }
  };

  return (
    <View
      ref={ref}
      style={[styles.badge, getVariantStyle(), props.style]}
      {...props}
    >
      <Text style={[styles.badgeText, getTextVariantStyle()]}>
        {children}
      </Text>
    </View>
  );
});
Badge.displayName = 'Badge';

const styles = StyleSheet.create({
  badge: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  badgeDefault: {
    backgroundColor: '#111827',
  },
  badgeSecondary: {
    backgroundColor: '#F3F4F6',
  },
  badgeDestructive: {
    backgroundColor: '#DC2626',
  },
  badgeOutline: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  badgeText: {
    fontSize: 12,
    fontWeight: '500',
    textAlign: 'center',
  },
  badgeTextDefault: {
    color: '#ffffff',
  },
  badgeTextSecondary: {
    color: '#374151',
  },
  badgeTextDestructive: {
    color: '#ffffff',
  },
  badgeTextOutline: {
    color: '#374151',
  },
});

export { Badge };