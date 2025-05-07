/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';

function Register(): React.JSX.Element {

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
        url: 'http://localhost:3001/api/user/login',
        method: 'POST',
        onSuccess: 'getLoginDetails',
        onError: 'GLOBAL_MESSAGE',
        dispatchType: 'getLoginDetails',
        body: {
          userInfo: {
            email: formInput?.email,
            password: formInput?.password,
          }
        }
      },
    }) as unknown as { isAuth: boolean };
  }

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.sectionContainer} keyboardShouldPersistTaps="handled">
        <SafeAreaView style={styles.flexContainer}>
          <View style={styles.formContainer}>
            <Text style={styles.heading1}>{appBasicInfo?.loginUser?.firstName} {appBasicInfo?.loginUser?.lastName}</Text>
            <View style={styles.logoWrapper}>
              <Image
                style={styles.logo}
                source={require('../../../assets/images/logo.png')}
                width={200}
              />
            </View>
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
              <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            <Text >Already registered? Login.</Text>
          </View>
        </SafeAreaView>
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
    width: 66,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
  },
  heading2: {
    fontSize: 24,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 20,
    paddingHorizontal: '5%',
  },
  sectionContainer: {
    flexGrow: 1,
    padding: '5%',
    backgroundColor: '#F3C623',
  },
  flexContainer: {
    justifyContent: 'center',
    alignContent: 'center',
    minHeight: '100%',
  },
  formContainer: {
    padding: 16,
    gap: 16,
  },
  inputText: {
    borderWidth: 1,
    borderColor: '#948979',
    padding: 10,
    borderRadius: 16,
    backgroundColor: 'white',
    color: 'black',
    fontSize: 16,
    fontWeight: '400',
  },
  primaryBtn: {
    backgroundColor: '#10375C',
    padding: 12,
    borderRadius: 16,
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

export default Register;
