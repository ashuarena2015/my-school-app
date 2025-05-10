import React from 'react';
import { View, StyleSheet } from 'react-native';

const MainLayout = ({ children }) => {
    return (
        <View style={styles.sectionContainer}>
            <View style={styles.tiltedBackground} />
            <View style={{ position: 'relative', zIndex: 2 }}>
                {children}
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flexGrow: 1,
        backgroundColor: '#FFF',
        flex: 1,
        justifyContent: 'center',
        height: '100%'
    },
    tiltedBackground: {
      position: 'absolute',  // Position it behind the content
      zIndex: 1,
      width: '200%',
      height: '100%',
      top: '-35%',
      backgroundColor: '#D3E671',
      transform: [
        { rotate: '-80deg' }  // This rotates the background
      ],
    },
});

export default MainLayout;
