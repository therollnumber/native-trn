// React Native Theme Configuration
// Converted from globals.css Tailwind V4 variables for React Native compatibility

export const lightTheme = {
  colors: {
    background: '#ffffff',
    foreground: 'oklch(0.145 0 0)', // Near black
    card: '#ffffff',
    cardForeground: 'oklch(0.145 0 0)',
    popover: 'oklch(1 0 0)', // Pure white
    popoverForeground: 'oklch(0.145 0 0)',
    primary: '#030213', // Very dark blue
    primaryForeground: 'oklch(1 0 0)',
    secondary: 'oklch(0.95 0.0058 264.53)', // Light purple-blue
    secondaryForeground: '#030213',
    muted: '#ececf0', // Light gray
    mutedForeground: '#717182', // Medium gray
    accent: '#e9ebef', // Very light gray
    accentForeground: '#030213',
    destructive: '#d4183d', // Red
    destructiveForeground: '#ffffff',
    border: 'rgba(0, 0, 0, 0.1)', // Semi-transparent black
    input: 'transparent',
    inputBackground: '#f3f3f5', // Very light gray
    switchBackground: '#cbced4', // Light blue-gray
    ring: 'oklch(0.708 0 0)', // Medium gray
    
    // Chart colors
    chart1: 'oklch(0.646 0.222 41.116)', // Orange-ish
    chart2: 'oklch(0.6 0.118 184.704)', // Blue-ish
    chart3: 'oklch(0.398 0.07 227.392)', // Dark blue
    chart4: 'oklch(0.828 0.189 84.429)', // Yellow-green
    chart5: 'oklch(0.769 0.188 70.08)', // Orange-yellow
    
    // Sidebar colors
    sidebar: 'oklch(0.985 0 0)', // Very light gray
    sidebarForeground: 'oklch(0.145 0 0)',
    sidebarPrimary: '#030213',
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.97 0 0)',
    sidebarAccentForeground: 'oklch(0.205 0 0)',
    sidebarBorder: 'oklch(0.922 0 0)',
    sidebarRing: 'oklch(0.708 0 0)',
  },
  
  // Font weights from CSS variables
  fontWeights: {
    normal: '400',
    medium: '500',
  },
  
  // Border radius values (converted from CSS calc)
  radius: {
    sm: 6, // calc(0.625rem - 4px) = 6px
    md: 8, // calc(0.625rem - 2px) = 8px  
    lg: 10, // 0.625rem = 10px (base radius)
    xl: 14, // calc(0.625rem + 4px) = 14px
  },
  
  // Typography scale
  typography: {
    fontSize: 14, // --font-size from CSS
    h1: {
      fontSize: 28, // text-2xl equivalent
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 24, // text-xl equivalent
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h3: {
      fontSize: 20, // text-lg equivalent
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 16, // text-base equivalent
      fontWeight: '500',
      lineHeight: 1.5,
    },
    p: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
  },
};

export const darkTheme = {
  colors: {
    background: 'oklch(0.145 0 0)', // Very dark gray
    foreground: 'oklch(0.985 0 0)', // Very light gray
    card: 'oklch(0.145 0 0)',
    cardForeground: 'oklch(0.985 0 0)',
    popover: 'oklch(0.145 0 0)',
    popoverForeground: 'oklch(0.985 0 0)',
    primary: 'oklch(0.985 0 0)', // Very light gray
    primaryForeground: 'oklch(0.205 0 0)', // Dark gray
    secondary: 'oklch(0.269 0 0)', // Medium dark gray
    secondaryForeground: 'oklch(0.985 0 0)',
    muted: 'oklch(0.269 0 0)',
    mutedForeground: 'oklch(0.708 0 0)', // Medium gray
    accent: 'oklch(0.269 0 0)',
    accentForeground: 'oklch(0.985 0 0)',
    destructive: 'oklch(0.396 0.141 25.723)', // Dark red
    destructiveForeground: 'oklch(0.637 0.237 25.331)', // Lighter red
    border: 'oklch(0.269 0 0)',
    input: 'oklch(0.269 0 0)',
    inputBackground: 'oklch(0.269 0 0)',
    switchBackground: 'oklch(0.269 0 0)',
    ring: 'oklch(0.439 0 0)', // Medium dark gray
    
    // Chart colors (dark mode)
    chart1: 'oklch(0.488 0.243 264.376)', // Purple-blue
    chart2: 'oklch(0.696 0.17 162.48)', // Cyan-green
    chart3: 'oklch(0.769 0.188 70.08)', // Orange-yellow
    chart4: 'oklch(0.627 0.265 303.9)', // Magenta
    chart5: 'oklch(0.645 0.246 16.439)', // Red-orange
    
    // Sidebar colors (dark mode)
    sidebar: 'oklch(0.205 0 0)', // Dark gray
    sidebarForeground: 'oklch(0.985 0 0)',
    sidebarPrimary: 'oklch(0.488 0.243 264.376)', // Purple-blue
    sidebarPrimaryForeground: 'oklch(0.985 0 0)',
    sidebarAccent: 'oklch(0.269 0 0)',
    sidebarAccentForeground: 'oklch(0.985 0 0)',
    sidebarBorder: 'oklch(0.269 0 0)',
    sidebarRing: 'oklch(0.439 0 0)',
  },
  
  // Font weights (same as light)
  fontWeights: {
    normal: '400',
    medium: '500',
  },
  
  // Border radius values (same as light)
  radius: {
    sm: 6,
    md: 8,
    lg: 10,
    xl: 14,
  },
  
  // Typography (same structure as light)
  typography: {
    fontSize: 14,
    h1: {
      fontSize: 28,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h2: {
      fontSize: 24,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h3: {
      fontSize: 20,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    h4: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    p: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    button: {
      fontSize: 16,
      fontWeight: '500',
      lineHeight: 1.5,
    },
    input: {
      fontSize: 16,
      fontWeight: '400',
      lineHeight: 1.5,
    },
  },
};

// TheRollNumber Wallet specific colors
export const rollNumberWalletTheme = {
  // Gradient colors for TheRollNumber Wallet (matching ADi logo)
  gradient: {
    primary: '#1BA5E0', // Cyan
    secondary: '#1E3A8A', // Navy blue
  },
  
  // Identity document specific colors
  documents: {
    aadhaar: '#FF6B35', // Orange
    pan: '#4ECDC4', // Teal
    dl: '#45B7D1', // Light blue
    passport: '#96CEB4', // Light green
    voterId: '#FFEAA7', // Light yellow
  },
  
  // Professional identity colors
  professional: {
    doctor: '#FF7675', // Light red
    nurse: '#74B9FF', // Light blue
    ca: '#FDCB6E', // Yellow
    engineer: '#6C5CE7', // Purple
    icai: '#A29BFE', // Light purple
    trai: '#FD79A8', // Pink
  },
  
  // Status colors
  status: {
    verified: '#00B894', // Green
    pending: '#FDCB6E', // Yellow
    rejected: '#E17055', // Red
    notUploaded: '#DDD', // Gray
  },
  
  // Tab bar colors
  tabBar: {
    active: '#1BA5E0', // Cyan
    inactive: '#8E8E93', // Gray
    background: '#F8F9FA', // Light gray
  },
};

// Helper function to get theme based on mode
export const getTheme = (isDark = false) => {
  return isDark ? darkTheme : lightTheme;
};

// Helper function to create React Native StyleSheet compatible object
export const createStyleSheet = (theme) => {
  return {
    container: {
      backgroundColor: theme.colors.background,
      flex: 1,
    },
    card: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.radius.lg,
      borderWidth: 1,
      borderColor: theme.colors.border,
      padding: 16,
      marginVertical: 8,
    },
    button: {
      backgroundColor: theme.colors.primary,
      borderRadius: theme.radius.md,
      paddingVertical: 12,
      paddingHorizontal: 16,
      alignItems: 'center',
      justifyContent: 'center',
    },
    buttonText: {
      color: theme.colors.primaryForeground,
      fontSize: theme.typography.button.fontSize,
      fontWeight: theme.typography.button.fontWeight,
    },
    input: {
      backgroundColor: theme.colors.inputBackground,
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: theme.radius.md,
      paddingVertical: 12,
      paddingHorizontal: 16,
      fontSize: theme.typography.input.fontSize,
      color: theme.colors.foreground,
    },
    text: {
      color: theme.colors.foreground,
      fontSize: theme.typography.p.fontSize,
      fontWeight: theme.typography.p.fontWeight,
      lineHeight: theme.typography.p.lineHeight * theme.typography.p.fontSize,
    },
    heading1: {
      color: theme.colors.foreground,
      fontSize: theme.typography.h1.fontSize,
      fontWeight: theme.typography.h1.fontWeight,
      lineHeight: theme.typography.h1.lineHeight * theme.typography.h1.fontSize,
    },
    heading2: {
      color: theme.colors.foreground,
      fontSize: theme.typography.h2.fontSize,
      fontWeight: theme.typography.h2.fontWeight,
      lineHeight: theme.typography.h2.lineHeight * theme.typography.h2.fontSize,
    },
    // TheRollNumber Wallet specific styles
    walletGradientButton: {
      backgroundColor: rollNumberWalletTheme.gradient.primary,
      borderRadius: theme.radius.md,
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    aadhaarCard: {
      backgroundColor: rollNumberWalletTheme.documents.aadhaar,
      borderRadius: theme.radius.lg,
      padding: 16,
    },
    verifiedStatus: {
      backgroundColor: rollNumberWalletTheme.status.verified,
      color: '#ffffff',
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: theme.radius.sm,
    },
  };
};

// export default function theme configuration
export default  {
  light: lightTheme,
  dark: darkTheme,
  rollNumber: rollNumberWalletTheme,
  getTheme,
  createStyleSheet,
};