import { FC } from "react";
import { View, Text, Image, StyleSheet, Platform } from "react-native";
import { useDispatch } from "react-redux";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerItem, DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL, API_URL } from '@env';

import Home from "./components/home";
import Login from "./components/login";
// import Logout from "./components/Logout";
import Notifications from "./components/Notifications";
import Blogs from "./components/Blogs";
import Chat from "./components/Chat";

import useWebSocket from './components/RealTimeMessage/webSocket';


const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface ScreenNavigationProps {
  loginUser?: any; // Adjust type as needed
  isNotification?: boolean;
}

// Your custom user component in the drawer
const CustomDrawerContent = (props: DrawerContentComponentProps & { loginUser?: any }) => {
  const { loginUser } = props;

  const dispatch = useDispatch();

  const { checkOfflineUser } = useWebSocket((data) => {
    console.log({checkOfflineUserData:data});
    dispatch({
      type: 'users/onlineUsers',
      payload: {
        onlineUsers: data,
        findOfflineUser: true
      }
    });
  },[]);

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
      <DrawerItem
        label="Logout"
        onPress={async () => {
          checkOfflineUser(loginUser?.email || '');
          dispatch({
              type: "apiRequest",
              payload: {
                  url: `${API_URL}/user/logout`,
                  method: "GET",
                  onError: "GLOBAL_MESSAGE",
                  dispatchType: "userLogout",
              }
          }) as { isLogout?: boolean; error?: string };
        }}
      />
    </DrawerContentScrollView>
  );
}

const ScreenHeader = ({ loginUser, isNotification }: { loginUser?: any, isNotification?: boolean }) => (
  <View style={styles.headerInfoContainer}>
    <Image
      source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto || 'default-avatar.png'}` }}
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
    {/* <Drawer.Screen
      name="Logout"
      component={Logout}
    /> */}
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

  console.log({loginUserScreen: loginUser});
  return (
    isAuthenticated ? <AuthenticatedDrawer loginUser={loginUser} isNotification={isNotification} /> : <AuthStack />
  );
};

const styles = StyleSheet.create({
  userSection: {
    padding: 20,
    backgroundColor: "#FFE57F",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 10
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: '#FFF',
    backgroundColor: '#FFF'
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
    alignItems: 'center',
    justifyContent: 'flex-end',
    color: '#fff',
    alignSelf: 'stretch',
    width: '100%'
  },
  avatarHeader: {
    width: 36,
    height: 36,
    borderRadius: 36,
    marginRight: 10,
    marginBottom: Platform.OS === 'ios' ? 10 : 0,
    // borderWidth: 1,
    // borderColor: '#FFF',
    backgroundColor: '#FFF'
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
