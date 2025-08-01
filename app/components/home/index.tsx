import React, { FC } from 'react';
import Home from './home';
import WithAuthLayout from '../HOC/WithAuth';

interface HomePageProps {
    navigation?: object;
    route?: object;
    loginUser?: {
        email?: string;
        firstName?: string;
        lastName?: string;
        designation?: string;
        profilePhoto?: string;
    }; // Adjust type as needed
}

const HomePageAuth = WithAuthLayout((props: HomePageProps) => <Home navigation={props?.navigation} loginUser={props?.loginUser || {}} />);

const HomePage: FC<HomePageProps> = ({ navigation, loginUser }) => {
    return (
        <HomePageAuth navigation={navigation} loginUser={loginUser} />
    )
}

export default HomePage;