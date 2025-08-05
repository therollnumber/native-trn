import React, { useState } from 'react';
import { Image, View, Text, StyleSheet } from 'react-native';

export default function ImageWithFallback({ 
  src, 
  alt, 
  style, 
  fallbackText,
  ...props 
}) {
  const [hasError, setHasError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setHasError(true);
    setIsLoading(false);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  if (hasError) {
    return (
      <View style={[styles.fallbackContainer, style]}>
        <Text style={styles.fallbackText}>
          {fallbackText || alt || 'Image not available'}
        </Text>
      </View>
    );
  }

  return (
    <Image
      source={{ uri: src }}
      style={style}
      onError={handleError}
      onLoad={handleLoad}
      resizeMode="cover"
      {...props}
    />
  );
}

const styles = StyleSheet.create({
  fallbackContainer: {
    backgroundColor: '#F3F4F6',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  fallbackText: {
    color: '#6B7280',
    fontSize: 14,
    textAlign: 'center',
  },
});