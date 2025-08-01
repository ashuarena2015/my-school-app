import React, { FC, useEffect, useState, useCallback, useMemo } from "react";
import { ScrollView, FlatList, Image, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome5";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../services/store";
import AppText from "../AppText";

import UserTypeDropdown from "./UserType";

// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL, PHOTO_URL } from "@env";

interface StudentsListProps {
  navigation: any;
}

const UsersList: FC<StudentsListProps> = ({ navigation }) => {

  console.log('UsersList component rendered');

  const dispatch = useDispatch<AppDispatch>();
  // const router = useRouter();
  const { users, roleTypes, userListTypeSelected } =
    useSelector((state: RootState) => state.users) || [];

  const [userList, setUserList] = useState<any[]>([]);

  const getClassesMapItems = (roles: any[]) => {
    return roles.map((item) => ({
      label: item.label,
      value: item.key,
      key: item.key
    }));
  };
  const [valueUser, setValueUser] = useState<string | null>('');
  
  const fetchAllUsers = useCallback(async () => {
    console.log("Fetching all users with valueUser:", valueUser);
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user`,
        method: "POST",
        onSuccess: "users/getAllUsers",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "getAllUsers",
        body: {
          userAll: 1,
          designation: valueUser || "",
        },
      },
    });
  }, [dispatch, valueUser]);

  // Call only when valueUser changes
  useEffect(() => {
    if (!users?.length || valueUser) {
      fetchAllUsers();
    }
  }, [users, fetchAllUsers, valueUser]);

  // Sync Redux to local list
  useEffect(() => {
    if (users?.length) {
      setUserList(users);
    }
  }, [users]);

  const getItems = useCallback(() => getClassesMapItems(roleTypes), [roleTypes]);

  return (
    <SafeAreaProvider>
      <SafeAreaView edges={["top"]}>
        <View style={{ ...styles.container }}>
          <View style={{ marginBottom: 20 }}>
            <AppText style={{ ...styles.container_title }}>
              {users?.length} Users
            </AppText>
            <UserTypeDropdown
              valueUser={valueUser || userListTypeSelected}
              items={getItems()}
              setValueUser={setValueUser}
            />
          </View>
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={{ flexGrow: 1, padding: 0, maxHeight: 320 }}
            keyboardShouldPersistTaps="handled"
          >
            <FlatList
              data={userList}
              // scrollEnabled={false}
              keyExtractor={(item, index) => item.id?.toString() ?? index.toString()}
              renderItem={({ item }) => {
                return (
                  <View style={{ ...styles.infoView }} key={item.id}>
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        alignItems: "center",
                      }}
                    >
                      <Image
                        source={{
                          uri: `${PHOTO_URL}/${
                            item.profilePhoto || "default-avatar.png"
                          }`,
                        }}
                        style={{ ...styles.infoView_image }}
                      />
                      <View style={{ maxWidth: "80%" }}>
                        <AppText
                          onPress={() => alert("hi")}
                          style={{ ...styles.full_name }}
                        >
                          {item.firstName} {item.lastName}
                        </AppText>
                        <AppText
                          style={{ ...styles.sub_info }}
                          numberOfLines={1}
                        >
                          #{item.userId}, {item.email}
                        </AppText>
                      </View>
                    </View>
                    {/* <View>
                      <AppText onPress={() => navigation.navigate("Profile")}>
                        Go
                      </AppText>
                    </View> */}
                    <Icon name="arrow-right" size={16} color="#333" />
                  </View>
                );
              }}
            />
          </ScrollView>
        </View>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingTop: 20,
    padding: 16,
  },
  container_title: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 4,
    color: "#333",
  },
  infoView: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    justifyContent: "space-between",
  },
  full_name: {
    fontSize: 16,
    color: "#333",
  },
  sub_info: {
    fontSize: 14,
    color: "#666",
    width: 200,
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  infoView_image: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
});

export default UsersList;
