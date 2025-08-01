import { FC, useCallback } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, ScrollView, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppText from "../AppText";
import useWebSocket from "../RealTimeMessage/webSocket";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";
import { zoneDateToTime, notificationMessages } from "../../utils/common";
import { RootState } from "../../services/store";

const Notifications: FC = () => {
  const { notifications } = useSelector((state: RootState) => state.users);

  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user/notifications`,
        method: "GET",
        onSuccess: "users/adminInfo",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "schoolGeneralInfo",
      },
    });
  };

  const resetNotificationStatus = () => {
    dispatch({
      type: "users/getNotifications",
      payload: false,
    });
  };

  const { sendNotification } = useWebSocket((data: any) => {
    dispatch({
      type: "users/getNotifications",
      payload: true,
    });
  });

  useFocusEffect(
    useCallback(() => {
      fetchNotifications();
      resetNotificationStatus();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

//   const [formInput, setFormInput] = useState({
//     notificationText: "",
//   });
//   const handlChange = (name: string, value: string | number) => {
//     setFormInput((prevState) => ({
//       ...prevState,
//       [name]: value?.toString(),
//     }));
//   };

//   const handleSendMessage = () => {
//     sendNotification(formInput?.notificationText);
//   };

  return (
    <View style={styles.container}>
      {/* <TextInput
        onChangeText={(text: string) => handlChange("notificationText", text)}
      ></TextInput>
      <Button title="New meesgae" onPress={handleSendMessage} /> */}
      <ScrollView
        scrollEnabled={true}
        contentContainerStyle={{ flexGrow: 1, padding: 0 }}
        keyboardShouldPersistTaps="handled"
      >
        {notificationMessages(notifications)?.map((data, i) => (
          <FlatList
            ListHeaderComponent={() => <View style={styles.listHeader}><Text style={styles.listHeaderText}>{notifications[i]?._id}</Text></View>}
            key={i}
            data={data}
            keyExtractor={(item, index) =>
              item.id?.toString() ?? index.toString()
            }
            renderItem={({ item }) => {
              return (
                <View key={item._id}>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <View style={styles.message_box}>
                      <AppText style={styles.message_text}>
                        {item.message}
                      </AppText>
                      <AppText style={styles.message_time}>
                        {zoneDateToTime(item.date)}
                      </AppText>
                    </View>
                  </View>
                </View>
              );
            }}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
  message_box: {
    padding: 10,
    marginBottom: 10,
    borderBottomWidth: 1,
    width: "100%",
    borderColor: '#E0E0E0'
  },
  message_text: {
    fontSize: 16,
    color: "#333",
  },
  message_time: {
    fontSize: 12,
    color: "#999",
    marginTop: 5,
  },
  listHeader: {
    // borderWidth: 1,
    // borderColor: 'red',
    borderRadius: 4,
    padding: 8,
    backgroundColor: '#d4bff9'
  },
  listHeaderText: {
    fontSize: 18
  }
});

export default Notifications;
