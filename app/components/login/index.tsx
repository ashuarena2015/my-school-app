import React, { FC } from 'react';
import Login from './login';
import WithAuthLayout from '../HOC/WithAuth';

interface LoginPageProps {
    navigation?: object;
    route?: object;
}

const LoginPageAuth = WithAuthLayout((props: LoginPageProps) => <Login navigation={props?.navigation} route={props?.route || {}} />);

const LoginPage: FC<LoginPageProps> = ({ navigation, route }) => {
    return (
        <LoginPageAuth navigation={navigation} route={route} />
    )
}

export default LoginPage;