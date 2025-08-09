import React, { FC, useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
//   KeyboardAvoidingView,
//   TouchableWithoutFeedback,
  Platform,
//   Keyboard,
  Pressable,
  StatusBar,
  FlatList,
} from 'react-native';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import { useDispatch } from 'react-redux';
import { zoneDateToDate } from '@/app/utils/common';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL, API_URL } from '@env';
import useWebSocketChat from '../RealTimeMessage/webSocket-chat';

interface ChatRoomProps {
  chatRoomData: any;
  sender: string;
}

const ChatRoom: FC<ChatRoomProps> = ({ chatRoomData, sender }) => {
  const dispatch = useDispatch();
  const [chatRoomId, setChatRoomId] = useState('');
  const [formInput, setFormInput] = useState({ userMessage: "" });
  const [allChatMessages, setAllChatMessages] = useState<any>([]);

  const flatListRef = useRef<FlatList>(null);

  const handlChange = (name: string, value: string) => {
    setFormInput((prev) => ({ ...prev, [name]: value }));
  };

  const createChatRoom = async () => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/chat/create-chatroom`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "createChatRoom",
        body: { users: chatRoomData },
      },
    }) as unknown as { participants: any[]; chatRoomId: string };

    if (response?.participants) {
      startChatWithUser(response?.participants, chatRoomId);
      setChatRoomId(response?.chatRoomId);
    }
  };

  const sendMessages = async () => {
    if (!formInput.userMessage.trim()) return;

    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/chat/send-message`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "sendChatMessages",
        body: {
          chatRoomId,
          sender,
          message: formInput?.userMessage
        },
      },
    }) as unknown as { chatInfo: { _id: string }};

    if(response?.chatInfo?._id) {
        startChatWithUser(chatRoomData, chatRoomId)
    }

    setFormInput({ userMessage: "" });
    flatListRef.current?.scrollToOffset({ offset: 0, animated: true });
    getAllMessages(chatRoomId);
  };

  const { startChatWithUser } = useWebSocketChat((data: any, chatRoomId: string) => {
    getAllMessages(chatRoomId)
  });

  const getAllMessages = async (chatRoomId: string) => {
    const response = await dispatch({
      type: "apiRequest",
      payload: {
        url: `${API_URL}/chat/get-chatroom-messages`,
        method: "POST",
        onError: "GLOBAL_MESSAGE",
        dispatchType: "getChatMessages",
        body: { chatRoomId },
      },
    }) as unknown as { getChatMessages: any[] };

    if (response?.getChatMessages) {
      setAllChatMessages(response.getChatMessages);
      setChatRoomId(response?.getChatMessages[0]?.chatRoom);
    }
  };

  useEffect(() => {
    if (chatRoomData?.length) createChatRoom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomData]);

  useEffect(() => {
    if (chatRoomId) getAllMessages(chatRoomId);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [chatRoomId]);

  useEffect(() => {
    setTimeout(() => {
        if (allChatMessages.length > 0) {
            flatListRef.current?.scrollToEnd({ animated: true });
          }
    }, 100);
  }, [allChatMessages]);

  const renderMessage = ({ item }: { item: any }) => (
    <View style={styles.messages_wrapper}>
      <View style={styles.chat_date_wrapper}>
        <Text style={styles.chat_date}>
          {zoneDateToDate(item?._id, 'dd MMM yyyy')}
        </Text>
      </View>
      {item?.messages?.map((msg: any, k: number) => (
        <View key={k} style={msg?.sender === sender ? styles.message_login_user : styles.message_chat_user}>
          <Text>{msg?.message}</Text>
        </View>
      ))}
    </View>
  );

  return (
        <View style={{ flex: 1 }}>
          <SafeAreaProvider>
            <SafeAreaView style={styles.messages_container} edges={['top']}>
            <FlatList
                ref={flatListRef}
                data={allChatMessages}
                renderItem={renderMessage}
                keyExtractor={(_, index) => index.toString()}
            />
            </SafeAreaView>
          </SafeAreaProvider>

          <View style={styles.input_wrapper}>
            <TextInput
              placeholder="Type here"
              multiline
              style={styles.input_text}
              onChangeText={(value) => handlChange('userMessage', value)}
              value={formInput.userMessage}
            />
            <Pressable style={styles.send_button} onPress={sendMessages}>
              <Text style={{ color: '#fff' }}>Send</Text>
            </Pressable>
          </View>
        </View>
  );
};

const styles = StyleSheet.create({
  messages_wrapper: {},
  input_wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 5,
    paddingVertical: 10,
    marginBottom: Platform.OS === 'ios' ? 20 : 0,
  },
  input_text: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 16,
    height: 46,
    padding: 5
  },
  send_button: {
    backgroundColor: '#441752',
    paddingVertical: 10,
    paddingHorizontal: 20,
    height: 46,
    borderRadius: 16,
    marginLeft: 8
  },
  chat_date_wrapper: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center'
  },
  chat_date: {
    backgroundColor: '#FFF',
    padding: 4,
    borderRadius: 8,
    width: 100,
    borderWidth: 1,
    borderColor: '#CCC',
  },
  messages_container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  message_login_user: {
    width: '75%',
    marginLeft: '25%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#C5EBAA',
    marginVertical: 8,
  },
  message_chat_user: {
    width: '75%',
    marginRight: '25%',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 16,
    backgroundColor: '#FFF',
    marginVertical: 8,
  }
});

export default ChatRoom;
