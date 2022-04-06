import React from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
const Header = () => {
  return (
    <View style={styles.container}>
      <MaterialIcons name="keyboard-arrow-left" size={48} color="white" />
      <Text
        style={{
          color: 'white',
          fontWeight: '700',
          fontSize: 18,
        }}>
        New Post
      </Text>
      <View />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    backgroundColor: 'black',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
export default Header;
