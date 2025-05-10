import React, { FC, useEffect, useState } from "react";
import { StyleSheet, View, Image } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from '../../services/store'
// import { API_URL, PHOTO_URL } from "@env";
import AppText from '../AppText';
import SimpleTextSkeleton from '../Skeleton/text-simple';

const API_URL = 'https://my-school-app-backend.onrender.com/api';
const PHOTO_URL = 'https://my-school-app-backend.onrender.com/uploads';

const Profile: FC = () => {

    const route = useRoute();
    const { id } = route.params as { id: string };

    const { currentUser: { user } } = useSelector((state: RootState) => state.users);

    const [isProfileLoading, setIsProfileLoading] = useState<boolean>(true)

    const dispatch = useDispatch();

    useEffect(() => {
        const fetchData = async () => {
          try {
            await dispatch({
              type: "apiRequest",
              payload: {
                url: `${API_URL}/user/${id}`,
                method: "GET",
                onError: "GLOBAL_MESSAGE",
                dispatchType: "getUserDetail",
              },
            });
            // if(response) {
                setIsProfileLoading(false);
            // }
          } catch (err) {
            console.error("Dispatch error:", err);
          }
        };
        fetchData();
    }, []);

    return (
        <View style={styles.container}>
            {isProfileLoading ? <View style={styles.profile_wrapper}>
                <Image
                    source={{ uri: `${PHOTO_URL}/default-avatar.png` }}
                    width={100}
                    height={100}
                    style={{ ...styles.profile_image }}
                    resizeMode="cover"
                    alt={''}
                />
                <SimpleTextSkeleton />
                <SimpleTextSkeleton width={50} />
                <SimpleTextSkeleton width={200} />
                <SimpleTextSkeleton width={300} />
            </View> :
            <View style={styles.profile_wrapper}>
                <Image
                    source={{ uri: `${PHOTO_URL}/${user?.profilePhoto}` }}
                    width={100}
                    height={100}
                    style={{ ...styles.profile_image }}
                    resizeMode="cover"
                    alt={''}
                />
                <View style={{ marginBottom: 24, alignContent: 'center' }}>
                    <AppText style={{ fontSize: 24 }}>{user?.firstName} {user?.lastName}</AppText>
                    <AppText>{user?.userId}</AppText>
                    <AppText>{user?.email}</AppText>
                </View>                    
                <AppText>Address: {user?.address}</AppText>
            </View>}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#A4B465',
        padding: 20,
        flex: 1
    },
    profile_wrapper: {
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
        // position: 'relative',
        margin: 'auto',
        width: '80%',
        padding: 20,
        borderRadius: 16,
        height: '80%',
        backgroundColor: '#FFF',
        // zIndex: 0
    },
    profile_image: {
        backgroundColor: '#fff',
        width: 120,
        height: 120,
        borderRadius: 70,
        borderWidth: 5,
        borderColor: '#fff',
        marginTop: -50,
        marginLeft: 100,
    },
});

export default Profile;