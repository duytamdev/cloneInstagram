import React from 'react';
import {Text, View, StyleSheet, ScrollView, Image} from 'react-native';
import {USERS} from '../../../assets/data/users';

const Stories = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal={true} showHorizontalScrollbar={false}>
        {USERS.map((story, index) => {
          return (
            <View style={styles.storyContainer} key={index}>
              <Image source={{uri: story.image}} style={styles.image} />
              <Text style={styles.nameText}>
                {story.user.length < 8
                  ? `${story.user}`
                  : `${story.user.substring(0, 8)}...`}
              </Text>
            </View>
          );
        })}
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  nameText: {
    color: 'white',
  },
  storyContainer: {
    alignItems: 'center',
    marginEnd: 8,
  },
  image: {
    width: 70,
    aspectRatio: 1,
    borderRadius: 48,
    borderWidth: 3,
    borderColor: '#ff8501',
  },
  container: {
    marginVertical: 13,
  },
});
export default Stories;
