import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import React from 'react';
import RootLayout from './app/_layout'; // adjust path if needed


export default function App() {
  return (<>
        <RootLayout />
        <StatusBar style="auto" />
    </>
  );
}
