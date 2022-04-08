import React, {useEffect} from 'react';
import {Text, View, ScrollView, StyleSheet, SafeAreaView} from 'react-native';
import {StatusBar} from 'expo-status-bar';

import Header from '../components/home/Header';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import {POSTS} from '../../assets/data/post';
import BottomTabs from '../components/home/BottomTabs';
import {db} from '../config/firebase';
import {collectionGroup, query, where, getDocs} from 'firebase/firestore';
const HomeScreen = ({navigation}) => {
  const [posts, setPosts] = React.useState([]);
  useEffect(() => {
    const getPosts = async () => {
      const museums = query(collectionGroup(db, 'posts'));
      const querySnapshot = await getDocs(museums);
      let clonePosts = [];
      querySnapshot.forEach(doc => {
        clonePosts.push(doc.data());
      });
      setPosts(clonePosts);
    };
    getPosts().then();
  }, []);
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      // do something
      const getPosts = async () => {
        const museums = query(collectionGroup(db, 'posts'));
        const querySnapshot = await getDocs(museums);
        let clonePosts = [];
        querySnapshot.forEach(doc => {
          clonePosts.push(doc.data());
        });
        setPosts(clonePosts);
      };
      getPosts().then();
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      <Stories />
      <ScrollView>
        {posts.map((post, index) => {
          return <Post key={index} post={post} />;
        })}
      </ScrollView>
      <BottomTabs />
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
