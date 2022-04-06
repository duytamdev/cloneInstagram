import React from 'react';
import {Text, View, StyleSheet, Image} from 'react-native';
import {StatusBar} from 'expo-status-bar';
import LoginForm from '../components/login/LoginForm';

const LoginScreen = () => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.imageLogo}
        source={{
          uri: 'https://play-lh.googleusercontent.com/h9jWMwqb-h9hjP4THqrJ50eIwPekjv7QPmTpA85gFQ10PjV02CoGAcYLLptqd19Sa1iJ',
        }}
      />
      <LoginForm />
      <StatusBar style={'light'} />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    padding: 16,
    alignItems: 'center',
  },
  imageLogo: {
    width: 80,
    marginTop: 50,
    aspectRatio: 1,
    borderRadius: 8,
  },
});
export default LoginScreen;
