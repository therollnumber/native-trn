import React, { createContext, useContext, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from 'react-native';

const TabsContext = createContext({});

const Tabs = ({ children, defaultValue, value, onValueChange, ...props }) => {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const currentValue = value ?? internalValue;

  const handleValueChange = (newValue) => {
    if (onValueChange) {
      onValueChange(newValue);
    } else {
      setInternalValue(newValue);
    }
  };

  return (
    <TabsContext.Provider value={{ value: currentValue, onValueChange: handleValueChange }}>
      <View style={[styles.tabs, props.style]} {...props}>
        {children}
      </View>
    </TabsContext.Provider>
  );
};

const TabsList = React.forwardRef(({ children, ...props }, ref) => {
  return (
    <View
      ref={ref}
      style={[styles.tabsList, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
TabsList.displayName = 'TabsList';

const TabsTrigger = React.forwardRef(({ children, value, ...props }, ref) => {
  const { value: selectedValue, onValueChange } = useContext(TabsContext);
  const isSelected = selectedValue === value;

  return (
    <TouchableOpacity
      ref={ref}
      onPress={() => onValueChange(value)}
      style={[
        styles.tabsTrigger,
        isSelected && styles.tabsTriggerActive,
        props.style
      ]}
      activeOpacity={0.7}
      {...props}
    >
      <Text style={[
        styles.tabsTriggerText,
        isSelected && styles.tabsTriggerTextActive
      ]}>
        {children}
      </Text>
    </TouchableOpacity>
  );
});
TabsTrigger.displayName = 'TabsTrigger';

const TabsContent = React.forwardRef(({ children, value, ...props }, ref) => {
  const { value: selectedValue } = useContext(TabsContext);

  if (selectedValue !== value) {
    return null;
  }

  return (
    <View
      ref={ref}
      style={[styles.tabsContent, props.style]}
      {...props}
    >
      {children}
    </View>
  );
});
TabsContent.displayName = 'TabsContent';

const styles = StyleSheet.create({
  tabs: {
    width: '100%',
  },
  tabsList: {
    flexDirection: 'row',
    backgroundColor: '#F3F4F6',
    borderRadius: 6,
    padding: 4,
  },
  tabsTrigger: {
    flex: 1,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 4,
    alignItems: 'center',
  },
  tabsTriggerActive: {
    backgroundColor: '#ffffff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 2,
    elevation: 2,
  },
  tabsTriggerText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#6B7280',
  },
  tabsTriggerTextActive: {
    color: '#111827',
  },
  tabsContent: {
    marginTop: 16,
  },
});

export { Tabs, TabsList, TabsTrigger, TabsContent };