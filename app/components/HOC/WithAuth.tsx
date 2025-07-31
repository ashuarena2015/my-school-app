import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';

const WithAuthLayout = (WrappedComponent: React.ComponentType) => {
  const ComponentWithAuthLayout = (props: any) => {
    const { navigation, loginUser } = props;
    const isAuthenticated = loginUser?.email;

    useEffect(() => {
      if (!isAuthenticated) {
        navigation.navigate('Login');
      }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isAuthenticated]);

    return (
      <View style={styles.layoutContainer}>
        <WrappedComponent {...props} />
      </View>
    );
  };

  return ComponentWithAuthLayout;
};

const styles = StyleSheet.create({
  layoutContainer: {
    padding: 16,
    flex: 1,
    height: '100%',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default WithAuthLayout;
