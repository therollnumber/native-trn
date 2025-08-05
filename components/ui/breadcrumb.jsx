import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { ChevronRight } from 'lucide-react-native';

const Breadcrumb = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.breadcrumb, props.style]} {...props}>
      {children}
    </View>
  );
});
Breadcrumb.displayName = 'Breadcrumb';

const BreadcrumbList = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.breadcrumbList, props.style]} {...props}>
      {children}
    </View>
  );
});
BreadcrumbList.displayName = 'BreadcrumbList';

const BreadcrumbItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.breadcrumbItem, props.style]} {...props}>
      {children}
    </View>
  );
});
BreadcrumbItem.displayName = 'BreadcrumbItem';

const BreadcrumbLink = React.forwardRef(({ children, onPress, ...props }, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[styles.breadcrumbLink, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={styles.breadcrumbLinkText}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
BreadcrumbLink.displayName = 'BreadcrumbLink';

const BreadcrumbPage = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.breadcrumbPage, props.style]} {...props}>
      {children}
    </Text>
  );
});
BreadcrumbPage.displayName = 'BreadcrumbPage';

const BreadcrumbSeparator = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.breadcrumbSeparator, props.style]} {...props}>
      {children || <ChevronRight size={16} color="#6B7280" />}
    </View>
  );
});
BreadcrumbSeparator.displayName = 'BreadcrumbSeparator';

const BreadcrumbEllipsis = React.forwardRef(({ ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.breadcrumbEllipsis, props.style]} {...props}>
      <Text style={styles.breadcrumbEllipsisText}>...</Text>
    </View>
  );
});
BreadcrumbEllipsis.displayName = 'BreadcrumbEllipsis';

const styles = StyleSheet.create({
  breadcrumb: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbList: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  breadcrumbItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  breadcrumbLink: {
    paddingVertical: 4,
    paddingHorizontal: 2,
  },
  breadcrumbLinkText: {
    fontSize: 14,
    color: '#4F7CFF',
    textDecorationLine: 'underline',
  },
  breadcrumbPage: {
    fontSize: 14,
    color: '#111827',
    fontWeight: '500',
  },
  breadcrumbSeparator: {
    marginHorizontal: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  breadcrumbEllipsis: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  breadcrumbEllipsisText: {
    fontSize: 14,
    color: '#6B7280',
  },
});

export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
};