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
      <ScrollView keyboardShouldPersistTaps="handled">
        <View style={styles.flexContainer}>
          <View style={styles.formContainer}>
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
            <View style={{ flexDirection: 'row', justifyContent: 'center', marginTop: 20 }}>
              <AppText>Not registered yet?</AppText>
              <AppText onPress={() => navigation.navigate('Register')}> Create an account.</AppText>
            </View>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
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
  tiltedBackground: {
    position: 'absolute',  // Position it behind the content
    width: '100%',
    height: '100%',
    top: '-45%',
    backgroundColor: '#89AC46',
    transform: [
      { rotate: '-80deg' }  // This rotates the background
    ],
  },
  flexContainer: {
    margin: 24,
    borderWidth: 1,
    borderColor: '#f3f3f3',
    backgroundColor: '#fff',
    borderRadius: 12,
    shadowColor: '#999',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.25,
    shadowRadius: 12,
    paddingTop: 32,
    padding: 8
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#948979',
    padding: 10,
    borderRadius: 12,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  primaryBtn: {
    backgroundColor: '#10375C',
    padding: 8,
    borderRadius: 12,
    alignItems: 'center',
  },
  buttonPressed: {
    opacity: 0.75,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default Login;
