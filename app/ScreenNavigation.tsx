import { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL } from '@env';

import Home from "./components/home";
import Login from "./components/login";
import Logout from "./components/Logout";
import Notifications from "./components/Notifications";
import Blogs from "./components/Blogs";
import Chat from "./components/Chat";


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface ScreenNavigationProps {
  loginUser?: any; // Adjust type as needed
  isNotification?: boolean;
}

// Your custom user component in the drawer
const CustomDrawerContent = (props: DrawerContentComponentProps & { loginUser?: any }) => {
  const { loginUser } = props;
  return (
    <DrawerContentScrollView {...props}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <Image
          source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto || 'default-avatar.png'}` }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{loginUser?.firstName || loginUser?.userId} {loginUser?.lastName}</Text>
        <Text style={styles.email}>{loginUser?.email}</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const ScreenHeader = ({ loginUser, isNotification }: { loginUser?: any, isNotification?: boolean }) => (
  <View style={styles.headerInfoContainer}>
    <Image
      source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto}` }}
      style={styles.avatarHeader}
    />
    {isNotification ? <View style={styles.notification_dot}></View> : null}
  </View>
);

const AuthenticatedDrawer:FC<ScreenNavigationProps> = ({ loginUser, isNotification }) => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} loginUser={loginUser} />}
  >
    <Drawer.Screen
      name="Home"
      component={Home}
      options={{
        headerTitle: () => (
          ScreenHeader({ loginUser, isNotification })
        ),
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#463a69' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <Drawer.Screen
      name="Notifications"
      component={Notifications}
      options={{
        headerTitle: () => (
          ScreenHeader({ loginUser, isNotification })
        ),
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#463a69' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <Drawer.Screen
      name="Blogs"
      component={Blogs}
      options={{
        headerTitle: () => (
          ScreenHeader({ loginUser, isNotification })
        ),
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#463a69' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <Drawer.Screen
      name="Chat"
      component={Chat}
      options={{
        headerTitle: () => (
          ScreenHeader({ loginUser, isNotification })
        ),
        headerTitleAlign: 'left',
        headerStyle: { backgroundColor: '#463a69' },
        headerTintColor: '#fff',
        headerTitleStyle: { fontWeight: 'bold' },
      }}
    />
    <Drawer.Screen
      name="Logout"
      component={() => <Logout navigation={{ navigate: (screen: string) => console.log(`Navigating to ${screen}`) }} />}
    />
  </Drawer.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const ScreenNavigation: FC<ScreenNavigationProps> = ({ loginUser, isNotification }) => {

  const isAuthenticated = !!loginUser?.email;

  return (
    isAuthenticated ? <AuthenticatedDrawer loginUser={loginUser} isNotification={isNotification} /> : <AuthStack />
  );
};

const styles = StyleSheet.create({
  userSection: {
    padding: 20,
    backgroundColor: "#FFE57F",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 8,
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 18,
  },
  email: {
    fontSize: 14,
    color: "gray",
  },
  headerInfoContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'flex-end',
    backgroundColor: '#463a69',
    color: '#fff',
    width: '100%',
    marginBottom: 8,
    flex: 1,
    alignSelf: 'stretch',
  },
  avatarHeader: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 10,
  },
  notification_dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: 'red',
    position: 'absolute',
    top: 0,
    right: 5,
  },
});

export default ScreenNavigation;
