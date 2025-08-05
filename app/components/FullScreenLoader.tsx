import React from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';

const FullScreenLoader = ({ visible }: { visible: boolean }) => (
  visible ? 
    <View style={styles.modalBackground}>
      <View style={styles.activityIndicatorWrapper}>
        <ActivityIndicator size="small" color="#fff" />
      </View>
    </View> : null
);

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    backgroundColor: '#00000040',
    minHeight: '100%',
    width: '110%',
    top: 0,
    bottom: 0,
    right: 0,
    left: 0,
    position: 'absolute'
  },
  activityIndicatorWrapper: {
    backgroundColor: '#00000099',
    borderRadius: 10,
    padding: 25,
  },
});

export default FullScreenLoader;
