import React from 'react';
import { View, Text, Button } from 'react-native';

const WithAuthLayout = (WrappedComponent: React.ComponentType) => {

  const ComponentWithAuthLayout = (props: any) => {

    const { navigation, loginUser } = props;
    const isAuthenticated = loginUser?.email;

    const goToLogin = () => {
        navigation.navigate('Login');
    }

    if (!isAuthenticated) {
        return <View>
            <Text>You can not access this page.</Text>
            <Button title="Login" onPress={goToLogin} />
        </View>
    }

    return (
      <div className="auth-layout">
        <WrappedComponent {...props} />
      </div>
    );
  };

  return ComponentWithAuthLayout;
};

export default WithAuthLayout;
