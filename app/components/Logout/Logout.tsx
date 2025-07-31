import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { View, Text, Button, StyleSheet } from 'react-native';
// @ts-ignore
// eslint-disable-next-line import/no-unresolved
import { API_URL } from "@env";

interface LogoutProps {
    navigation?: {
        navigate: (screen: string) => void;
    };
}

const Logout: FC<LogoutProps> = ({ navigation }) => {

    const dispatch = useDispatch();
    const handleLogout = async () => {
        const response = await dispatch({
            type: "apiRequest",
            payload: {
                url: `${API_URL}/user/logout`,
                method: "GET",
                onError: "GLOBAL_MESSAGE",
                dispatchType: "userLogout",
            }
        }) as { isLogout?: boolean; error?: string };

        if (response.isLogout) {
            navigation?.navigate('Login');
        } else {
            console.error("Logout failed", response?.error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.text}>Are you sure you want to logout?</Text>
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
