/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { FC, useEffect } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  View
} from 'react-native';

import Toast from 'react-native-toast-message';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch } from '../../services/store';
import Card from '../Card';
import StudentsList from '../Students/StudentsList';
import UsersList from '../Users/UsersList';

interface StudentsListProps {
  navigation: any;
}

const Home: FC<StudentsListProps> = ({ navigation }): React.JSX.Element => {

  const { loginUser, userCounter } = useSelector((state: any) => state.users);
  const infoRedux = useSelector((state: any) => state.users);
  console.log({ infoRedux2: infoRedux });
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    if (!loginUser?.email) {
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'info',
        text1: 'This is an info message',
      });
    }
  }, [loginUser?.email, navigation]);

    useEffect(() => {
      dispatch({
        type: 'apiRequest',
        payload: {
          url: 'http://localhost:3001/api/user/adminInfo',
          method: 'GET',
          onSuccess: 'users/adminInfo',
          onError: 'GLOBAL_MESSAGE',
          dispatchType: 'adminInfo',
        },
      });
    }, [dispatch]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.sectionContainer}
        keyboardShouldPersistTaps="handled"
      >
        {/* <Toast /> */}
        <View>
          <Card
            title={`Welcome, ${loginUser?.firstName} ${loginUser?.lastName}`}
            content={loginUser?.designation}
            image={`http://localhost:3001/uploads/${loginUser?.profilePhoto}`}
            customStyles={{ backgroundColor: '#F3C623' }}
            customStylesHeading1={{ fontSize: 18, fontWeight: '600', color: '#000' }}
            customStylesHeading2={{ fontSize: 16, fontWeight: '600', color: '#666', marginTop: 4 }}
          />
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
            <Card
              title="Students"
              content={userCounter?.students}
              image=""
              customStyles={{ backgroundColor: '#183B4E', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff', marginTop: 4 }}
            />
            <Card
              title="Staffs"
              content={userCounter?.teachers}
              image=""
              customStyles={{ backgroundColor: '#27548A', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff', marginTop: 4 }}
            />
          </View>
          <StudentsList navigation={navigation} />
          <UsersList navigation={navigation} />
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
    width: 66,
    height: 58,
  },
  heading1: {
    fontSize: 32,
    fontWeight: '600',
    marginBottom: 20,
    color: '#000',
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

export default Home;
