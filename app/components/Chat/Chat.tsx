import React, { useCallback, useState } from "react";
import { useFocusEffect } from '@react-navigation/native';
import {
  View,
  StyleSheet,
} from "react-native";
import { useSelector } from "react-redux";
import UsersList from "../Users/UsersList";
import ChatRoom from "./ChatRoom";
import { RootState } from "@/app/services/store";

const Chat = () => {

  const { loginUser } = useSelector((state: RootState) => state.users);
  const [showChatRoom, setShowChatRoom] = useState(false);
  const [chatRoomData, setChatRoomData] = useState({});

  const createChatRoom = (data: any) => {
    if(loginUser?._id !== data) {
      setChatRoomData([
        data,
        loginUser?._id
      ]);
      setShowChatRoom(true);
    } else {
      alert('You can not chat with your self!');
    }
  };

  useFocusEffect(
    useCallback(() => {
      return () => {
        setShowChatRoom(false);
      }
    }, [])
  );

  return (
    <View style={styles.container}>
        {!showChatRoom ? <UsersList createChatRoom={createChatRoom} /> : <ChatRoom chatRoomData={chatRoomData} sender={loginUser._id}  />}
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
