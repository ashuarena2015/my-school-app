import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RootState } from '@/app/services/reducers';

import useWebSocketChat from '../RealTimeMessage/webSocket-chat';

const WithAuthLayout = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { loginUser } = useSelector((state: RootState) => state.users);
    
    const { startChatWithUser } = useWebSocketChat((data, chatRoomId) => {
      console.log('New message', data, loginUser);
      if(data?.includes(loginUser?._id)) {
        alert('You have a message from a user' + JSON.stringify(data?.filter(x => x!== loginUser?._id)));
      }
    })

    return (
      <View style={styles.layoutContainer}>
        <WrappedComponent {...props} loginUser={loginUser} />
      </View>
    );
  };

  return Wrapper;
};

const styles = StyleSheet.create({
  layoutContainer: {
    padding: 16,
    flex: 1,
    height: '100%',
    backgroundColor: '#F5EFFF',
  },
});

export default WithAuthLayout;
