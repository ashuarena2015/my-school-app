import { FC } from "react";
import { View, Text, Image, StyleSheet } from "react-native";
import { createDrawerNavigator, DrawerContentScrollView, DrawerItemList, DrawerContentComponentProps } from "@react-navigation/drawer";
import { createStackNavigator } from "@react-navigation/stack";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL } from '@env';
import Home from "./components/home";
import Login from "./components/login";
import Profile from "./components/Profile";
import Logout from "./components/Logout";

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

interface ScreenNavigationProps {
  loginUser?: any; // Adjust type as needed
}

// Your custom user component in the drawer
const CustomDrawerContent = (props: DrawerContentComponentProps & { loginUser?: any }) => {
  const { loginUser } = props;
  console.log("CustomDrawerContent props", props);
  return (
    <DrawerContentScrollView {...props}>
      {/* User Info Section */}
      <View style={styles.userSection}>
        <Image
          source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto}` }}
          style={styles.avatar}
        />
        <Text style={styles.username}>{loginUser?.firstName} {loginUser?.lastName}</Text>
        <Text style={styles.email}>{loginUser?.email}</Text>
      </View>

      {/* Drawer Items */}
      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

const ScreenHeader = ({ loginUser }: { loginUser?: any }) => (
  <View style={styles.headerInfoContainer}>
    <Image
      source={{ uri: `${PHOTO_URL}/${loginUser?.profilePhoto}` }}
      style={styles.avatarHeader}
    />
    {/* <Text style={{ fontWeight: 'bold' }}>{`${loginUser?.firstName} ${loginUser?.lastName}`}</Text> */}
  </View>
);

const AuthenticatedDrawer:FC<ScreenNavigationProps> = ({ loginUser }) => (
  <Drawer.Navigator
    initialRouteName="Home"
    drawerContent={(props) => <CustomDrawerContent {...props} loginUser={loginUser} />}
  >
    <Drawer.Screen
      name="Home"
      component={() => <Home loginUser={loginUser} />}
      options={{
        headerTitle: () => (
          ScreenHeader({ loginUser })
        ),
        headerStyle: { ...styles.headerInfoContainer },
      }}
    />
    <Drawer.Screen name="Profile" component={Profile} />
    <Drawer.Screen name="Logout" component={() => <Logout navigation={{ navigate: (screen: string) => console.log(`Navigating to ${screen}`) }} />} />
  </Drawer.Navigator>
);

const AuthStack = () => (
  <Stack.Navigator
    screenOptions={{ headerShown: true }}
  >
    <Stack.Screen name="Login" component={Login} />
  </Stack.Navigator>
);

const ScreenNavigation: FC<ScreenNavigationProps> = ({ loginUser }) => {

  const isAuthenticated = !!loginUser?.email;

  return (
    isAuthenticated ? <AuthenticatedDrawer loginUser={loginUser} /> : <AuthStack />
  );
};

const styles = StyleSheet.create({
  userSection: {
    padding: 20,
    backgroundColor: "#f5f5f5",
    marginBottom: 10,
    alignItems: "center",
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
    justifyContent: 'flex-end',
    backgroundColor: '#463a69',
    color: '#fff',
    minWidth: '100%',
    marginBottom: 8,
    flex: 1,
  },
  avatarHeader: {
    width: 32,
    height: 32,
    borderRadius: 20,
    marginRight: 10,
  },
});

export default ScreenNavigation;
