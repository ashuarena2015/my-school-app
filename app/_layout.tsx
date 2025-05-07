// import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
// import { useFonts } from 'expo-font';
// import { Stack } from 'expo-router';
// import { StatusBar } from 'expo-status-bar';
// import 'react-native-reanimated';

// import { useColorScheme } from '@/hooks/useColorScheme';

// export default function RootLayout() {
//   const colorScheme = useColorScheme();
//   const [loaded] = useFonts({
//     SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
//   });

//   if (!loaded) {
//     // Async font loading only occurs in development.
//     return null;
//   }

//   return (
//     <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
//       <Stack>
//         <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
//         <Stack.Screen name="+not-found" />
//       </Stack>
//       <StatusBar style="auto" />
//     </ThemeProvider>
//   );
// }

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
// import Auth from './auth';
// import { DefaultTheme } from '@react-navigation/native';
import { Poppins_400Regular, useFonts } from '@expo-google-fonts/poppins';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './components/home/home';
import Login from './components/login/login';
import Profile from './components/Profile';

const Stack = createNativeStackNavigator();

function RootLayout(): React.JSX.Element {

  // const MyTheme = {
  //   ...DefaultTheme,
  //   colors: {
  //     ...DefaultTheme.colors,
  //     background: '#F1EFEC', // light gray or any color
  //     primary: 'blue',
  //     text: 'black',
  //   },
  // };

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
        {/* <Login /> */}
        {/* <NavigationContainer theme={MyTheme}> */}
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
            <Stack.Screen name="Profile" component={Profile} />
          </Stack.Navigator>
        {/* </NavigationContainer> */}
      </KeyboardAvoidingView>
    </Provider>
  );
}

export default RootLayout;
