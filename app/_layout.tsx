/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { Provider } from 'react-redux';
import store from './services/store';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/home/home';
import Login from './components/login/login';
import Register from './components/register/register';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

const RootLayout = () => {

  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <>Loading</>; // or a custom loading screen
  }

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerStyle: {
              backgroundColor: '#143D60', // header background
            },
            headerTintColor: '#ffffff', // header text color
          }}
        >
          <Stack.Screen
            name="Login"
            component={Login}
          />
          <Stack.Screen
            name="Register"
            component={Register}
          />
          <Stack.Screen
            name="Profile"
            component={Profile}
          />
          <Stack.Screen
            name="Home"
            component={Home}
          />
        </Stack.Navigator>
      </KeyboardAvoidingView>
    </Provider>
  );
}

export default RootLayout;
