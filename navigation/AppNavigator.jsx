import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';

// Import screens
import HomeScreen from '../components/HomeScreen.jsx';
import ProfileScreen from '../components/ProfileScreen.jsx';
import ShareScreen from '../components/ShareScreen.jsx';
import HelpScreen from '../components/HelpScreen.jsx';
import DeviceInfoScreen from '../components/DeviceInfoScreen.jsx';

// Import document screens
import IdentityDocumentsScreen from '../components/IdentityDocumentsScreen.jsx';
import AadhaarScreen from '../components/AadhaarScreen.jsx';
import PANScreen from '../components/PANScreen.jsx';
import DLScreen from '../components/DLScreen.jsx';

// Import professional screens
import ProfessionalIdentityScreen from '../components/ProfessionalIdentityScreen.jsx';
import DoctorScreen from '../components/DoctorScreen.jsx';
import NurseScreen from '../components/NurseScreen.jsx';
import ICAIScreen from '../components/ICAIScreen.jsx';

// Import other screens
import EducationScreen from '../components/EducationScreen.jsx';
import EmploymentScreen from '../components/EmploymentScreen.jsx';
import VerificationRequestsScreen from '../components/VerificationRequestsScreen.jsx';
import SharedWithScreen from '../components/SharedWithScreen.jsx';
import SubscriptionScreen from '../components/SubscriptionScreen.jsx';
import PreMaritalVerificationScreen from '../components/PreMaritalVerificationScreen.jsx';
import FamilyManagementScreen from '../components/FamilyManagementScreen.jsx';
import SearchCasesScreen from '../components/SearchCasesScreen.jsx';

// Import theme
import { rollNumberWalletTheme } from '../styles/globals.js';

// Create navigators
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

// Tab Icon Component
const TabIcon = ({ icon, focused, color }) => {
  return (
    <View style={[
      styles.tabIconContainer,
      focused && styles.activeTabIconContainer
    ]}>
      <Text style={[
        styles.tabIcon,
        { color: focused ? '#ffffff' : color }
      ]}>
        {icon}
      </Text>
    </View>
  );
};

// Home Stack Navigator
function HomeStackNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: '#ffffff',
          elevation: 1,
          shadowOpacity: 0.1,
        },
        headerTintColor: '#212529',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="HomeMain" 
        component={HomeScreen} 
        options={{ headerShown: false }}
      />
      
      {/* Identity Documents Stack */}
      <Stack.Screen 
        name="IdentityDocuments" 
        component={IdentityDocumentsScreen}
        options={{ title: 'Identity Documents' }}
      />
      <Stack.Screen 
        name="Aadhaar" 
        component={AadhaarScreen}
        options={{ title: 'Aadhaar Card' }}
      />
      <Stack.Screen 
        name="PAN" 
        component={PANScreen}
        options={{ title: 'PAN Card' }}
      />
      <Stack.Screen 
        name="DL" 
        component={DLScreen}
        options={{ title: 'Driving License' }}
      />
      
      {/* Professional Identity Stack */}
      <Stack.Screen 
        name="ProfessionalIdentity" 
        component={ProfessionalIdentityScreen}
        options={{ title: 'Professional Identity' }}
      />
      <Stack.Screen 
        name="Doctor" 
        component={DoctorScreen}
        options={{ title: 'Doctor Verification' }}
      />
      <Stack.Screen 
        name="Nurse" 
        component={NurseScreen}
        options={{ title: 'Nurse Verification' }}
      />
      <Stack.Screen 
        name="ICAI" 
        component={ICAIScreen}
        options={{ title: 'CA Verification' }}
      />
      
      {/* Other Screens */}
      <Stack.Screen 
        name="Education" 
        component={EducationScreen}
        options={{ title: 'Education Records' }}
      />
      <Stack.Screen 
        name="Employment" 
        component={EmploymentScreen}
        options={{ title: 'Employment History' }}
      />
      <Stack.Screen 
        name="VerificationRequests" 
        component={VerificationRequestsScreen}
        options={{ title: 'Verification Requests' }}
      />
      <Stack.Screen 
        name="SharedWith" 
        component={SharedWithScreen}
        options={{ title: 'Shared With' }}
      />
      <Stack.Screen 
        name="Subscription" 
        component={SubscriptionScreen}
        options={{ title: 'Subscription' }}
      />
      <Stack.Screen 
        name="PreMarital" 
        component={PreMaritalVerificationScreen}
        options={{ title: 'Pre-Marital Verification' }}
      />
      <Stack.Screen 
        name="FamilyManagement" 
        component={FamilyManagementScreen}
        options={{ title: 'Family Management' }}
      />
      <Stack.Screen 
        name="SearchCases" 
        component={SearchCasesScreen}
        options={{ title: 'Search Cases' }}
      />
    </Stack.Navigator>
  );
}

// Bottom Tab Navigator
function TabNavigator() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#f0f0f0',
          paddingVertical: 8,
          height: 70,
        },
        tabBarActiveTintColor: rollNumberWalletTheme.gradient.primary,
        tabBarInactiveTintColor: '#6c757d',
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
          marginTop: 4,
        },
        tabBarIcon: ({ focused, color }) => {
          let iconName;
          
          switch (route.name) {
            case 'Home':
              iconName = '🏠';
              break;
            case 'Profile':
              iconName = '👤';
              break;
            case 'Service':
              iconName = '📋';
              break;
            case 'Share':
              iconName = '📤';
              break;
            case 'More':
              iconName = '⋯';
              break;
            default:
              iconName = '📱';
          }
          
          return <TabIcon icon={iconName} focused={focused} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeStackNavigator} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
      <Tab.Screen name="Service" component={HelpScreen} />
      <Tab.Screen name="Share" component={ShareScreen} />
      <Tab.Screen name="More" component={DeviceInfoScreen} />
    </Tab.Navigator>
  );
}

// Main App Navigator
export default function AppNavigator() {
  return (
    <NavigationContainer>
      <TabNavigator />
    </NavigationContainer>
  );
}

// Styles
const styles = StyleSheet.create({
  tabIconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 4,
    paddingHorizontal: 12,
    borderRadius: 8,
    minWidth: 50,
  },
  activeTabIconContainer: {
    backgroundColor: rollNumberWalletTheme.gradient.primary,
  },
  tabIcon: {
    fontSize: 20,
  },
});