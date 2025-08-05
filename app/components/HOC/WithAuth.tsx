import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet } from 'react-native';
import { RootState } from '@/app/services/reducers';

const WithAuthLayout = (WrappedComponent: React.ComponentType<any>) => {
  const Wrapper = (props: any) => {
    const { loginUser } = useSelector((state: RootState) => state.users);

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
