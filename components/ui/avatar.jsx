import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { ImageWithFallback } from '../figma/ImageWithFallback.jsx';

const Avatar = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.avatar, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
Avatar.displayName = 'Avatar';

const AvatarImage = React.forwardRef(({ src, alt, ...props }, ref) => {
  const [hasError, setHasError] = useState(false);

  if (hasError || !src) {
    return null;
  }

  return (
    <ImageWithFallback
      ref={ref}
      src={src}
      alt={alt}
      style={[styles.avatarImage, props.style]}
      onError={() => setHasError(true)}
      {...props}
    />
  );
});
AvatarImage.displayName = 'AvatarImage';

const AvatarFallback = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.avatarFallback, props.style]}
      {...props}
    >
      <Text style={styles.avatarFallbackText}>
        {children}
      </Text>
    </View>
  );
});
AvatarFallback.displayName = 'AvatarFallback';

const styles = StyleSheet.create({
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: 'hidden',
    position: 'relative',
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  avatarFallback: {
    width: '100%',
    height: '100%',
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarFallbackText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
});

export { Avatar, AvatarImage, AvatarFallback };