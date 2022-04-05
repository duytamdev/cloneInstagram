import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import Header from '../components/home/Header';
import Stories from '../components/home/Stories';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <StatusBar style={'light'} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
    flex: 1,
    backgroundColor: 'black',
  },
});
export default HomeScreen;
