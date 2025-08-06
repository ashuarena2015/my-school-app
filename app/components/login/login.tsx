/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FC, useState, useEffect } from "react";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
  Pressable,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
// Icons
import Icon from "react-native-vector-icons/FontAwesome5";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";
import AppText from "../AppText";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import * as LocalAuthentication from "expo-local-authentication";
import * as SecureStore from "expo-secure-store";

import FullScreenLoader from "../FullScreenLoader";

interface PageProps {
  navigation: any;
  route: object
}

const Login: FC<PageProps> = ({ navigation, route }) => {
  const [formInput, setFormInput] = useState({
    email: "",
    password: "",
    branch: "",
    verifyOtp: "",
  });

  const { branches, roleTypes, loginUser } = useSelector((state: RootState) => state.users);

  const [otpVerifyForm, setOtpVerifyForm] = useState(false);

  const [open, setOpen] = useState(false);
  const [value, setValue] = useState(null);
  const [allBranches, setAllbranches] = useState([{}]);

  const [openUserType, setOpenUserType] = useState(false);
  const [userType, setUserType] = useState(null);
  const [allUsersType, setAllUsersType] = useState([{}]);

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (roleTypes.length > 0) {
      setAllUsersType(
        roleTypes.map((role: any) => ({
          label: role.label,
          value: role.key,
          key: role.key,
        }))
      );
    }
  }, [roleTypes]);

  useEffect(() => {
    if (branches.length > 0) {
      setAllbranches(
        branches.map((branch: any) => ({
          label: branch.branch,
          value: branch._id,
          key: branch._id,
        }))
      );
    }
  }, [branches]);

  const handlChange = (name: string, value: string | number) => {
    setFormInput((prevState) => ({
      ...prevState,
      [name]: value?.toString(),
    }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    setIsLoading(true);
    const response = (await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user/account`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "userLogin",
        body: {
          userInfo: {
            email: formInput?.email,
            password: formInput?.password,
            branch: formInput?.branch,
            userType: userType,
            verifyOtp: formInput?.verifyOtp,
          },
        },
      },
    })) as unknown as { isLogin: boolean; isNewUser: boolean };
    setIsLoading(false);
    if (response?.isNewUser) {
      setOtpVerifyForm(true);
    }
    if (response?.isLogin) {
      navigation.navigate("Home");
    }
  };

  // Biometrics Authentication logic
  const handleBiometricAuth = async () => {
    const result = await LocalAuthentication.authenticateAsync({
      promptMessage: "Authenticate",
      fallbackLabel: "Use Passcode",
      disableDeviceFallback: false,
    });
    if (result.success) {
      const savedEmail = await SecureStore.getItemAsync("email");
      const userVerified = await SecureStore.getItemAsync("isUserVerified");
      if (savedEmail && userVerified) {
        navigation.navigate("Home");
      }
    } else {
      console.log("Please use a valid pin");
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : undefined}
      keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
    >
      <FullScreenLoader visible={isLoading} />
      <ScrollView style={styles.mainWrpper} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <AppText style={{ fontSize: 32, lineHeight: 36 }}>
              Sign in or create an account.!
            </AppText>
            {!otpVerifyForm ? (
              <View style={{ flex: 1, gap: 16, position: "relative", zIndex: 1 }}>
                <TextInput
                  style={styles.inputText}
                  autoCapitalize="none"
                  placeholder="Enter your email"
                  placeholderTextColor="#999"
                  onChangeText={(text: string) => handlChange("email", text)}
                />
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter your password"
                  placeholderTextColor="#999"
                  onChangeText={(text: string) => handlChange("password", text)}
                  secureTextEntry
                />
                <View style={{ position: "relative", zIndex: 9999 }}>
                  <DropDownPicker
                    open={open}
                    value={value}
                    items={allBranches}
                    setOpen={setOpen}
                    setValue={setValue}
                    setItems={setAllbranches}
                    placeholder="Select your branch"
                    style={styles.dropDown}
                    placeholderStyle={{ color: "#999" }}
                    dropDownContainerStyle={{
                      backgroundColor: "#fff",
                      zIndex: 1000,
                    }}
                    onChangeValue={(value) => {
                      if (value !== null) {
                        handlChange("branch", value as string | number);
                      }
                    }}
                  />
                </View>
                <View style={{ position: "relative", zIndex: 9998 }}>
                  <DropDownPicker
                    open={openUserType}
                    value={userType}
                    items={allUsersType}
                    setOpen={setOpenUserType}
                    setValue={setUserType}
                    setItems={setAllUsersType}
                    style={styles.dropDown}
                    placeholder="Select user type"
                    placeholderStyle={{ color: "#999" }}
                    dropDownContainerStyle={{ backgroundColor: "#fff" }}
                    onChangeValue={(value) => {
                      if (value !== null) {
                        handlChange("userType", value as string | number);
                      }
                    }}
                  />
                </View>
              </View>
            ) : (
              <View>
                <TextInput
                  style={styles.inputText}
                  placeholder="Enter OTP"
                  placeholderTextColor="#999"
                  onChangeText={(text: string) =>
                    handlChange("verifyOtp", text)
                  }
                />
              </View>
            )}
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Continue</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Continue with Google</AppText>
            </TouchableOpacity>
            {Platform.OS !== "web" ? (
              <View>
                <Pressable
                  onPress={handleBiometricAuth}
                  style={({ pressed }) => [
                    {
                      flexDirection: "row",
                      justifyContent: "center",
                      marginTop: 20,
                      opacity: pressed ? 0.6 : 1,
                      transform: [{ scale: pressed ? 0.95 : 1 }],
                    },
                  ]}
                >
                  <Icon name="user-lock" size={50} color="#27548A" />
                </Pressable>
                <View style={{ alignItems: "center" }}>
                  <AppText>Try login with authentication</AppText>
                </View>
              </View>
            ) : (
              <View style={{ marginBottom: 24 }}></View>
            )}
          </View>
          <AppText>
            By continuing you agree to Terms of Services and Privacy Policy
          </AppText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  mainWrpper: {
    height: "100%",
    width: "100%",
    paddingLeft: 16,
    paddingRight: 16,
  },
  logoWrapper: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: "600",
    marginBottom: 20,
  },
  loginContainer: {
    marginBottom: 24,
    backgroundColor: "#fff",
    borderRadius: 12,
    shadowColor: "#999",
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    gap: 16,
  },
  formContainer: {
    flex: 1,
    minHeight: "100%",
    // justifyContent: "center",
  },
  inputText: {
    borderWidth: 1,
    borderColor: "#cacaca",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    fontWeight: "400",
  },
  dropDown: {
    borderWidth: 1,
    borderColor: "#cacaca",
    padding: 10,
    borderRadius: 12,
    backgroundColor: "white",
    color: "black",
    fontSize: 16,
    fontWeight: "400",
    minHeight: 40,
  },
  primaryBtn: {
    backgroundColor: "#A4B465",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    color: "#fff",
  },
  secondaryBtn: {
    backgroundColor: "#FFF",
    padding: 10,
    borderRadius: 12,
    alignItems: "center",
    borderColor: "#cacaca",
    borderWidth: 1,
    color: "#999",
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 16,
  },
  buttonLinked: {
    fontSize: 16,
    color: "#27548A",
    textDecorationLine: "underline",
  },
});

export default Login;
