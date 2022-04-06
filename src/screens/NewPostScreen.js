import React from 'react';
import {Text, View, StyleSheet, SafeAreaView} from 'react-native';
import Header from '../components/newPost/Header';
import {StatusBar} from 'expo-status-bar';
import FormikUploader from '../components/newPost/FormikUploader';

const NewPostScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <FormikUploader />
      <StatusBar style={'light'} />
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
});
export default NewPostScreen;
