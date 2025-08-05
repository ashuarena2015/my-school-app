import React, { FC } from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import Icon from "react-native-vector-icons/FontAwesome6";

const HomeSearch: FC = () => {
    return (
        <View style={styles.container}>
            <TextInput style={styles.input}></TextInput>
            <Icon name={'magnifying-glass'} size={18} color="#C3ACD0"  />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        flexDirection: 'row',
        padding: 16,
        backgroundColor: '#fff',
        borderRadius: 32,
        borderColor: '#ccc',
        borderWidth: 1,
        marginBottom: 16
    },
    input: {
        color: '#C3ACD0',
        fontSize: 16,
        width: '95%'
    }
})

export default HomeSearch;
