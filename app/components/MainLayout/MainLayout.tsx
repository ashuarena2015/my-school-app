import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";

const MainLayout = ({
  children,
  
}: {
  children: React.ReactNode;
  navigation: any;
  route: any;
}) => {

  return (
    <ScrollView contentContainerStyle={styles.scroll}>
      <View style={styles.container}>{children}</View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  scroll: {
    flexGrow: 1,
  },
  container: {
    flex: 1,
    padding: 16,
  },
});

export default MainLayout;
