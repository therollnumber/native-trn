import React from 'react';
import { StatusBar } from 'react-native';
import 'react-native-gesture-handler';

// Import navigation
import AppNavigator from './navigation/AppNavigator.jsx';

export default function App() {
  return (
    <>
      <StatusBar 
        backgroundColor="#ffffff" 
        barStyle="dark-content"
        translucent={false}
      />
      <AppNavigator />
    </>
  );
}