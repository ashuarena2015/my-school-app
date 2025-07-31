import React, { FC } from 'react';
import Logout from './Logout';
import WithAuthLayout from '../HOC/WithAuth';

interface LogoutPageProps {
    navigation?: {
        navigate: (screen: string) => void;
    };
}

const LogoutPageAuth = WithAuthLayout((props: LogoutPageProps) => <Logout navigation={props?.navigation} />);

const HomePage: FC<LogoutPageProps> = ({ navigation }) => {
    return (
        <LogoutPageAuth navigation={navigation} />
    )
}

export default HomePage;