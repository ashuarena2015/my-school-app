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
  View,
  Image
} from 'react-native';

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL } from '@env';
import Icon from "react-native-vector-icons/FontAwesome5";

import Toast from 'react-native-toast-message';
import { useSelector } from 'react-redux';
import Card from '../Card';

import UsersList from '../Users/UsersList';
import AppText from '../AppText';

interface StudentsListProps {
  navigation: any;
  loginUser: {
    email?: string;
    firstName?: string;
    lastName?: string;
    designation?: string;
    profilePhoto?: string;
  }
}

const Home: FC<StudentsListProps> = ({ navigation, loginUser }) => {

  const { userCounter } = useSelector((state: any) => state.users);

  console.log({loginUser});

  useEffect(() => {
    if (!loginUser?.email) {
      console.log('User not authenticated, redirecting to login');
      navigation.navigate('Login');
    } else {
      Toast.show({
        type: 'info',
        text1: 'This is an info message',
      });
    }
  }, [loginUser?.email, navigation]);

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      keyboardVerticalOffset={Platform.OS === 'ios' ? 60 : 0}
    >
      <ScrollView
        contentContainerStyle={styles.sectionContainer}
        keyboardShouldPersistTaps="handled"
        scrollEnabled={false}
      >
        <View>
          <View style={styles.profileInfoContainer}>
            <Image
              style={styles.profileImage}
              source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto}` }}
            />
            <View>
              <AppText>Good morning!</AppText>
              <AppText style={{ fontSize: 20, fontWeight: 'bold' }}>{`Welcome, ${loginUser?.firstName} ${loginUser?.lastName}`}</AppText>
            </View>
          </View>
          <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', gap: 4 }}>
            <Card
              title="Students"
              content={userCounter?.students}
              image={''}
              icon={<Icon name="graduation-cap" size={24} color="#fff" />}
              customStyles={{ backgroundColor: '#183B4E', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff' }}
            />
            <Card
              title="Admins"
              content={parseFloat(userCounter?.teachers + userCounter?.staffs + userCounter?.head_principals + userCounter?.head_teachers + userCounter?.principals || 0).toFixed(0)}
              image=""
              icon={<Icon name="user-shield" size={24} color="#fff" />}
              customStyles={{ backgroundColor: '#27548A', width: '48%'}}
              customStylesHeading1={{ fontSize: 16, fontWeight: '600', color: '#fff' }}
              customStylesHeading2={{ fontSize: 32, fontWeight: '600', color: '#fff' }}
            />
          </View>
          <UsersList navigation={navigation} />
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    flexGrow: 1,
  },
  profileInfoContainer: {
    padding: 8,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  profileImage: {
    width: 56,
    height: 56,
    borderRadius: 56,
    marginRight: 10,
  },
});

export default Home;
