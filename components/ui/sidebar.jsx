import React, { createContext, useContext, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
} from 'react-native';
import { ChevronRight, PanelLeft } from 'lucide-react-native';

const SidebarContext = createContext({});

const SidebarProvider = ({ children, defaultOpen = true, open, onOpenChange }) => {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open !== undefined ? open : internalOpen;
  const [isMobile, setIsMobile] = useState(false);

  const handleOpenChange = (newOpen) => {
    if (onOpenChange) {
      onOpenChange(newOpen);
    } else {
      setInternalOpen(newOpen);
    }
  };

  return (
    <SidebarContext.Provider value={{
      state: isOpen ? 'expanded' : 'collapsed',
      open: isOpen,
      onOpenChange: handleOpenChange,
      isMobile,
      openMobile: isOpen && isMobile,
      setOpenMobile: handleOpenChange,
      toggleSidebar: () => handleOpenChange(!isOpen),
    }}>
      {children}
    </SidebarContext.Provider>
  );
};

const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error('useSidebar must be used within a SidebarProvider');
  }
  return context;
};

const Sidebar = React.forwardRef(({ 
  children, 
  side = 'left', 
  variant = 'sidebar',
  collapsible = 'offcanvas',
  ...props 
}, ref) => {
  const { open, isMobile } = useSidebar();

  return (
    <View
      ref={ref}
      style={[
        styles.sidebar,
        side === 'right' && styles.sidebarRight,
        variant === 'floating' && styles.sidebarFloating,
        variant === 'inset' && styles.sidebarInset,
        !open && styles.sidebarCollapsed,
        isMobile && styles.sidebarMobile,
        props.style
      ]}
      {...props}
    >
      {children}
    </View>
  );
});
Sidebar.displayName = 'Sidebar';

const SidebarHeader = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarHeader, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarHeader.displayName = 'SidebarHeader';

const SidebarContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarContent, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarContent.displayName = 'SidebarContent';

const SidebarFooter = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarFooter, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarFooter.displayName = 'SidebarFooter';

const SidebarGroup = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarGroup, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarGroup.displayName = 'SidebarGroup';

const SidebarGroupLabel = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <Text ref={ref} style={[styles.sidebarGroupLabel, props.style]} {...props}>
      {children}
    </Text>
  );
});
SidebarGroupLabel.displayName = 'SidebarGroupLabel';

const SidebarGroupContent = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarGroupContent, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarGroupContent.displayName = 'SidebarGroupContent';

const SidebarMenu = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarMenu, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarMenu.displayName = 'SidebarMenu';

const SidebarMenuItem = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View ref={ref} style={[styles.sidebarMenuItem, props.style]} {...props}>
      {children}
    </View>
  );
});
SidebarMenuItem.displayName = 'SidebarMenuItem';

const SidebarMenuButton = React.forwardRef(({ 
  children, 
  isActive = false,
  onPress,
  ...props 
}, ref) => {
  return (
    <TouchableOpacity
      ref={ref}
      onPress={onPress}
      style={[
        styles.sidebarMenuButton,
        isActive && styles.sidebarMenuButtonActive,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      {children}
    </TouchableOpacity>
  );
});
SidebarMenuButton.displayName = 'SidebarMenuButton';

const SidebarTrigger = React.forwardRef(({ ...props }, ref) => {
  const { toggleSidebar } = useSidebar();

  return (
    <TouchableOpacity
      ref={ref}
      onPress={toggleSidebar}
      style={[styles.sidebarTrigger, props.style]}
      activeOpacity={0.7}
      {...props}
    >
      <PanelLeft size={16} color="#6B7280" />
    </TouchableOpacity>
  );
});
SidebarTrigger.displayName = 'SidebarTrigger';

const styles = StyleSheet.create({
  sidebar: {
    backgroundColor: 'var(--color-sidebar)',
    width: 256,
    height: '100%',
    flexShrink: 0,
    borderRightWidth: 1,
    borderRightColor: 'var(--color-sidebar-border)',
  },
  sidebarRight: {
    borderRightWidth: 0,
    borderLeftWidth: 1,
    borderLeftColor: 'var(--color-sidebar-border)',
  },
  sidebarFloating: {
    borderRadius: 8,
    margin: 8,
    height: 'calc(100% - 16px)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  sidebarInset: {
    backgroundColor: 'transparent',
    borderRightWidth: 0,
  },
  sidebarCollapsed: {
    width: 64,
  },
  sidebarMobile: {
    position: 'absolute',
    left: 0,
    top: 0,
    zIndex: 50,
    width: '80%',
    maxWidth: 320,
  },
  sidebarHeader: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'var(--color-sidebar-border)',
  },
  sidebarContent: {
    flex: 1,
    padding: 8,
  },
  sidebarFooter: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: 'var(--color-sidebar-border)',
  },
  sidebarGroup: {
    marginBottom: 16,
  },
  sidebarGroupLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: 'var(--color-sidebar-foreground)',
    opacity: 0.7,
    textTransform: 'uppercase',
    paddingHorizontal: 12,
    paddingVertical: 8,
  },
  sidebarGroupContent: {
    // Group content styles
  },
  sidebarMenu: {
    // Menu styles
  },
  sidebarMenuItem: {
    marginBottom: 2,
  },
  sidebarMenuButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 6,
    minHeight: 36,
  },
  sidebarMenuButtonActive: {
    backgroundColor: 'var(--color-sidebar-accent)',
    color: 'var(--color-sidebar-accent-foreground)',
  },
  sidebarTrigger: {
    padding: 8,
    borderRadius: 4,
    backgroundColor: 'transparent',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export {
  SidebarProvider,
  useSidebar,
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
};