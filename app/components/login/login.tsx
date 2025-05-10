/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FC, useState } from 'react';
import {
  // SafeAreaView,
  // Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { API_URL } from "@env";
import AppText from '../AppText';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';

// Icons
import Icon from 'react-native-vector-icons/FontAwesome5';

interface PageProps {
  navigation: any;
}

const Login:FC<PageProps> = ({ navigation }) => {

  const appBasicInfo = useSelector((state: any) => state.users);

  const [formInput, setFormInput] = useState({
      email: '',
      password: '',
  });

  const handlChange = (name: string, value: string) => {
      setFormInput((prevState) => ({
          ...prevState,
          [name]: value,
      }));
  };

  const dispatch = useDispatch<AppDispatch>();

  const handleSubmit = async () => {
    const response = await dispatch({
      type: 'apiRequest',
      payload: {
        url: `${API_URL}/user/login`,
        method: 'POST',
        onError: 'GLOBAL_MESSAGE',
        dispatchType: 'userLogin',
        body: {
          userInfo: {
            email: formInput?.email,
            password: formInput?.password,
          }
        }
      },
    }) as unknown as { isLogin: boolean };
    if(response?.isLogin) {
      navigation.navigate('Home');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      // style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView style={styles.mainWrpper} keyboardShouldPersistTaps="handled">
        <View style={styles.formContainer}>
          <View style={styles.loginContainer}>
            <AppText style={{ fontSize: 32, lineHeight: 36 }}>Sign in or create an account.</AppText>
            <TextInput
              style={styles.inputText}
              autoCapitalize="none"
              placeholder="Enter your email"
              placeholderTextColor="#999"
              onChangeText={(text: string) => handlChange('email', text)}
            />
            <TextInput
              style={styles.inputText}
              placeholder="Enter your password"
              placeholderTextColor="#999"
              onChangeText={(text: string) => handlChange('password', text)}
              secureTextEntry
            />
            <TouchableOpacity
              style={styles.primaryBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Login</AppText>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.secondaryBtn}
              onPress={handleSubmit}
              activeOpacity={0.8}
            >
              <AppText style={styles.buttonText}>Continue with Google</AppText>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <Icon name="fingerprint" size={70} color="#27548A" />;
            </View>
          </View>
          <AppText>By continuing you agree to Terms of Services and Privacy Policy</AppText>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  mainWrpper: {
    height: '100%',
    width: '100%',
    padding: 32
  },
  logoWrapper: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 200,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  loginContainer: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    paddingTop: 32,
    paddingLeft: 24,
    paddingRight: 24,
    paddingBottom: 32,
    gap: 16
  },
  formContainer: {
    flex: 1,
    minHeight: '100%',
    justifyContent: 'center'
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#cacaca',
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  primaryBtn: {
    backgroundColor: '#A4B465',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    color: '#fff',
  },
  secondaryBtn: {
    backgroundColor: '#FFF',
    padding: 10,
    borderRadius: 12,
    alignItems: 'center',
    borderColor: '#cacaca',
    borderWidth: 1,
    color: '#999'
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    fontSize: 16,
  },
});

export default Login;
