import React from 'react';
import Home from './home';
import WithAuthLayout from '../HOC/WithAuth';

const EnhancedHome = WithAuthLayout(Home);

const HomePage = ({ navigation, route }: any) => {
  return <EnhancedHome />;
};

export default HomePage;
