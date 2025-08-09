import React, { FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

import useWebSocket from '../RealTimeMessage/webSocket';
import { RootState } from '@/app/services/store';

interface LogoutProps {
    loginUser: {
        email: string;
    }
}

const Logout: FC<LogoutProps> = () => {

    const { loginUser } = useSelector((state: RootState) => state.users);
    const { checkOfflineUser } = useWebSocket((data) => {},[]);

    useEffect(() => {
        return () => {            
            checkOfflineUser(loginUser.email || '');
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [loginUser?.email]);
    

    const dispatch = useDispatch();
    const handleLogout = async () => {
            await dispatch({
                type: "apiRequest",
                payload: {
                    url: `${API_URL}/user/logout`,
                    method: "GET",
                    onError: "GLOBAL_MESSAGE",
                    dispatchType: "userLogout",
                }
            }) as { isLogout?: boolean; error?: string };
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>{loginUser?.email}, Are you sure you want to logout?</Text>
            <Button title="Logout" onPress={handleLogout} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 20,
    },
});

export default Logout;
