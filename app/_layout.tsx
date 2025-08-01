import React from "react";
import { View, Platform, KeyboardAvoidingView, Text } from "react-native";
import { Provider } from "react-redux";
import { NavigationContainer } from "@react-navigation/native";
import { GestureHandlerRootView } from "react-native-gesture-handler";

import store from "./services/store";
import { Poppins_400Regular, useFonts } from "@expo-google-fonts/poppins";

import ScreenWrapper from "./ScreenWrapper";

const RootLayout = () => {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
  });

  if (!fontsLoaded) {
    return <Text>Loading</Text>;
  }

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <NavigationContainer>
          <View style={{ flex: 1 }}>
            <KeyboardAvoidingView
              behavior={Platform.OS === "ios" ? "padding" : undefined}
              style={{ flex: 1 }}
            >
              <ScreenWrapper />
            </KeyboardAvoidingView>
          </View>
        </NavigationContainer>
      </Provider>
    </GestureHandlerRootView>
  );
};

export default RootLayout;
