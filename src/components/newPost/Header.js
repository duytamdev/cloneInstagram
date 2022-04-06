import React from 'react';
import {Text, View, StyleSheet, TouchableOpacity} from 'react-native';
import {MaterialIcons} from '@expo/vector-icons';
import {useNavigation} from '@react-navigation/native';
const Header = () => {
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <MaterialIcons name="keyboard-arrow-left" size={48} color="white" />
      </TouchableOpacity>
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
