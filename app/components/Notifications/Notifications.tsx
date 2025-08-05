import { FC, useCallback, useState, useMemo } from "react";
import { useFocusEffect } from "@react-navigation/native";
import { View, FlatList, StyleSheet, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import AppText from "../AppText";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";
import { zoneDateToTime, notificationMessages } from "../../utils/common";
import { RootState } from "../../services/store";

import FullScreenLoader from "../FullScreenLoader";

const Notifications: FC = () => {
  const { notifications } = useSelector((state: RootState) => state.users);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const fetchNotifications = async () => {
    setIsLoading(true);
    await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/user/notifications`,
        method: "GET",
        onSuccess: "users/adminInfo",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "schoolNotifications",
      },
    });
    setIsLoading(false);
  };

  const resetNotificationStatus = () => {
    dispatch({
      type: "users/getNotifications",
      payload: false,
    });
  };

  useFocusEffect(
    useCallback(() => {
      resetNotificationStatus();
      fetchNotifications();
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])
  );

  const groupedNotifications = useMemo(() => notificationMessages(notifications), [notifications]);

  return (
    <View style={styles.container}>
        <FullScreenLoader visible={isLoading} />
        {groupedNotifications?.map((data, i) => (
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
