import React, { FC } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Pressable,
} from "react-native";
import { SafeAreaView, SafeAreaProvider } from "react-native-safe-area-context";
import { modulesItems } from "./common";
import Icon from "react-native-vector-icons/FontAwesome6";

import Birtdays from './birthdays';

const Modules: FC = () => {

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safeArea_container} edges={["top"]}>
        <ScrollView>
          <View style={styles.module_container}>
            {modulesItems?.map((item, i) => (
              <View style={styles.module_box_wrapper} key={i}>
                <View style={styles.module_box}>
                  <Icon name={item.icon} size={22} color="#C3ACD0" />
                </View>
                <Text style={styles.label}>{item.label}</Text>
              </View>
            ))}
            {/* Upcoming Events */}
            <View style={styles.upcoming_event_wrapper}>
              <View style={styles.upcoming_event_header}>
                <Text style={styles.upcoming_event_label}>Upcoming Events</Text>
                <Pressable
                  style={styles.view_all_btn}
                  onPress={() => alert("View all")}
                >
                  <Text>View all</Text>
                </Pressable>
              </View>
              <View style={styles.events_box}>
                <Text>
                  Contrary to popular belief, Lorem Ipsum is not simply random
                  text. It has roots in a...
                </Text>
              </View>
              <View style={styles.events_box}>
                <Text>
                  Richard McClintock, a Latin professor at Hampden-Sydney
                  College in Virginia...
                </Text>
              </View>
            </View>
          </View>
          <Birtdays />
        </ScrollView>
      </SafeAreaView>
    </SafeAreaProvider>
  );
};

const styles = StyleSheet.create({
  safeArea_container: {
    flex: 1,
  },
  module_container: {
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  module_box_wrapper: {
    alignItems: "center",
    width: '20%',
    marginBottom: 12,
    gap: 8,
  },
  label: {
    fontSize: 10,
  },
  module_box: {
    width: 56,
    height: 56,
    borderWidth: 1,
    borderColor: "#E5D4FF",
    backgroundColor: "#FFFBF5",
    borderRadius: 56,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  upcoming_event_wrapper: {
    padding: 16,
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    marginTop: 16,
    width: "100%",
  },
  upcoming_event_header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  view_all_btn: {
    paddingTop: 4,
    paddingBottom: 4,
    paddingLeft: 8,
    paddingRight: 8,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 16,
    backgroundColor: "#F8F6F4",
  },
  upcoming_event_label: {
    fontSize: 18,
  },
  events_box: {
    backgroundColor: "#FFEBB4",
    padding: 8,
    borderRadius: 8,
    marginBottom: 8,
  },
});

export default Modules;
