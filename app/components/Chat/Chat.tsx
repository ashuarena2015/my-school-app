import React, { useEffect, useState, useRef } from "react";
import {
  View,
  TextInput,
  Button,
  FlatList,
  Text,
  SafeAreaView,
  StyleSheet,
} from "react-native";
import useWebSocket from "../RealTimeMessage/webSocket";

import UsersList from "../Users/UsersList";

const Chat = () => {
  const [message, setMessage] = useState("");
  const [chatMessages, setChatMessages] = useState<any[]>([]);

  const { sendMessage } = useWebSocket((data) => {
    console.log("Received:", data);
    const msgData = {
      message: data.message,
      sender: data.sender || "UserB", // Default sender if not provided
      time: new Date().toLocaleTimeString(),
    };
    setChatMessages((prev) => [...prev, msgData]);
  });

  const handleSend = () => {
    const msgData = {
      message,
      sender: "UserA", // Replace with actual user
      time: new Date().toLocaleTimeString(),
    };

    sendMessage(msgData); // Send over socket
    setChatMessages((prev) => [...prev, msgData]); // Add locally
    setMessage(""); // Clear input
  };

  return (
    <View style={styles.container}>
        <UsersList />
      {/* <FlatList
        data={chatMessages}
        renderItem={({ item }) => (
          <Text style={styles.message}>{item.sender}: {item.message}</Text>
        )}
        keyExtractor={(item, index) => index.toString()}
      /> */}

      {/* <View style={styles.inputContainer}>
        <TextInput
          value={message}
          onChangeText={setMessage}
          placeholder="Type your message"
          style={styles.input}
        />
        <Button title="Send" onPress={handleSend} />
      </View> */}
    </View>
  );
};

export default Chat;

const styles = StyleSheet.create({
  container: { flex: 1, padding: 10, height: '100%' },
  inputContainer: { flexDirection: "row", alignItems: "center" },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  message: {
    padding: 8,
    backgroundColor: "#f0f0f0",
    borderRadius: 5,
    marginVertical: 4,
  },
});
