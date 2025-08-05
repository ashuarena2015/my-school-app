import React, { FC, useState } from "react";
import {
  StyleSheet,
  View,
  Modal,
  Pressable,
  TextInput,
  Text,
  Image,
  ScrollView,
  Alert,
} from "react-native";
import { useSelector } from "react-redux";
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { PHOTO_URL } from "@env";
import { RootState } from "@/app/services/store";
import Icon from "react-native-vector-icons/FontAwesome6";

import useWebSocket from '../RealTimeMessage/webSocket';

interface userInfoProps {
    firstName: any;
    email: string;
    userId?: string;
    birthDayMessage?: string;
}

const Birtdays: FC = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const { birthdays, loginUser } = useSelector((state: RootState) => state.users);

  const [messageSent, setMessageSent] = useState(false);

  const [userInfo, setUserInfo] = useState<userInfoProps>({
    firstName: '',
    email: '',
    birthDayMessage: '',
    userId: ''
  })

  const [messageText, setMessageText] = useState('')
  console.log({userInfo});
  const { sendInboxMessage } = useWebSocket((data) => {
        setMessageSent(true)
    });

  useWebSocket((data) => {
    if(loginUser?.email === userInfo?.email) {
        alert('hiiii');
    }
  }, [messageSent]);

  console.log({messageSent});
  return (
      <View style={styles.upcoming_birthday_wrapper}>
        <View style={styles.upcoming_birthday_header}>
          <Text role="button" style={styles.upcoming_birthday_label}>
            Upcoming Birthdays
          </Text>
        </View>
        <ScrollView horizontal={true}>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              gap: 12,
              justifyContent: "flex-start",
            }}
          >
            {birthdays?.map((user, i) => (
                <View style={styles.birthday_box} key={i}>
                    <Pressable
                    onPress={() => {
                        setModalVisible(true);
                        setUserInfo({
                            firstName: user?.firstName,
                            email: user?.email,
                            userId: user?.userId
                        })
                    }}
                    style={styles.birthday_box_photo}
                    >
                    <Image
                        source={{ uri: `${PHOTO_URL}/${user?.profilePhoto || 'default-avatar.png'}` }}
                        width={64}
                        height={64}
                    />
                    </Pressable>
                    <Text>{user?.firstName}</Text>
                </View>
            ))}
          </View>
        </ScrollView>
        {/* Modal - Wish Birtday */}
        <Modal
          backdropColor={"#ccc"}
          transparent={true}
          animationType="fade"
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <TextInput
                style={styles.textInput}
                onChangeText={(value) => setMessageText(value)}
                multiline
                placeholder={`Wish to ${userInfo?.firstName}...`}
                value={messageText}
              />
              <Pressable style={styles.close_modal_btn} onPress={() => setModalVisible(!modalVisible)}>
                <Icon name="xmark" color="#999" size={24} />
              </Pressable>
              <Pressable
                style={styles.save_modal_btn}
                onPress={() =>
                    sendInboxMessage({
                        message: messageText,
                        userId: userInfo?.userId || '',
                        email: userInfo?.email
                    })}
                >
                <Text style={styles.btn_save}>Send</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
  );
};

const styles = StyleSheet.create({
  upcoming_birthday_wrapper: {
    padding: 16,
    backgroundColor: "#FFF",
    borderColor: "#CCC",
    borderWidth: 1,
    borderRadius: 8,
    width: "100%",
    marginTop: 16
  },
  upcoming_birthday_header: {
    display: "flex",
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  upcoming_birthday_label: {
    fontSize: 18,
  },
  birthday_box: {
    display: "flex",
    alignItems: "center",
    width: 64,
  },
  birthday_box_photo: {
    borderRadius: 32,
    width: 64,
    height: 64,
    overflow: "hidden",
  },
  centeredView: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalView: {
    width: "90%",
    margin: 20,
    backgroundColor: "white",
    borderRadius: 8,
    padding: 16,
    paddingTop: 42,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  textInput: {
    width: "100%",
    height: 100,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    padding: 8,
  },
  close_modal_btn: {
    position: 'absolute',
    right: 10,
    top: 10
  },
  save_modal_btn: {
    width: '100%',
    padding: 8,
    borderRadius: 4,
    marginTop: 8,
    backgroundColor: '#463a69',
  },
  btn_save: {
    color: '#fff',
    textAlign: 'center'
  }
});

export default Birtdays;
