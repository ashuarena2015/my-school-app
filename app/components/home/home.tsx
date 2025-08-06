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
  StyleSheet,
  View,
  Image
} from 'react-native';

import Modules from './modules';
import HomeSearch from './home_search';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL } from '@env';
import Icon from "react-native-vector-icons/FontAwesome5";

import Toast from 'react-native-toast-message';
import { useDispatch } from 'react-redux';

// import UsersList from '../Users/UsersList';
import AppText from '../AppText';

import useWebSocket from '../RealTimeMessage/webSocket';

interface HomePageProps {
  navigation: any;
  loginUser: {
    email?: string;
    firstName?: string;
    lastName?: string;
    designation?: string;
    profilePhoto?: string;
    userId: string;
  }
}

const Home: FC<HomePageProps> = (props) => {
  const dispatch = useDispatch();
  const { loginUser, navigation } = props;

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

  const { checkOnlineUser } = useWebSocket((data) => {
    console.log({data});
    dispatch({
      type: 'users/onlineUsers',
      payload: {
        onlineUsers: data
      }
    })
  },[]);

  useEffect(() => {
    if (loginUser?.email) {
      checkOnlineUser(loginUser.email);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loginUser?.email]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
        <View style={{ flex: 1 }}>
          <View style={styles.profileInfoContainer}>
            <View>
              <AppText>Good Morning,</AppText>
              <AppText style={{ fontSize: 20, fontWeight: 'bold' }}>{`${loginUser?.firstName || loginUser?.userId} ${loginUser?.lastName || ''}`}!</AppText>
            </View>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <Image
                style={styles.profileImage}
                source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto || 'default-avatar.png'}` }}
              />
              <View style={styles.icon_wrapper}>
                <View style={styles.notification_dot}></View>
                <Icon name="bell" size={18} color="#999" />
              </View>
            </View>
          </View> 
          <HomeSearch />
          <Modules />
        </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
  },
  profileInfoContainer: {
    paddingTop: 8,
    paddingBottom: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  profileImage: {
    width: 42,
    height: 42,
    borderRadius: 42,
    marginRight: 10,
  },
  icon_wrapper: {
    width: 42,
    height: 42,
    backgroundColor: '#FFF9E5',
    borderWidth: 1,
    borderColor: '#DCD7C9',
    borderRadius: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  notification_dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#A4DD00',
    position: 'absolute',
    top: 0,
    right: 2,
  },
});

export default Home;
