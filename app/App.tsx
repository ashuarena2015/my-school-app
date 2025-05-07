/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { Provider } from 'react-redux';
import store from './services/store';
// import Auth from './auth';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/home/home';
import Login from './components/login/login';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {

  const MyTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#F1EFEC', // light gray or any color
      primary: 'blue',
      text: 'black',
    },
  };

  return (
    <Provider store={store}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        style={{ flex: 1 }}
      >
        {/* <Login /> */}
        <NavigationContainer theme={MyTheme}>
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
              options={{title: 'Login'}}
            />
            <Stack.Screen name="Home" component={Home} />
          </Stack.Navigator>
        </NavigationContainer>
      </KeyboardAvoidingView>
    </Provider>
  );
}

export default App;
