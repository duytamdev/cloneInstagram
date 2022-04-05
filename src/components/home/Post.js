import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const PostHeader = ({post}) => {
  return (
    <View>
      <View style={styles.divider} />
      <View style={styles.headerContainer}>
        <View style={styles.rightHeader}>
          <Image source={{uri: post.imageUrl}} style={styles.imageAvt} />
          <Text style={styles.nameText}>{post.user}</Text>
        </View>
        <Image source={require('../../../assets/images/hearti.png')} />
      </View>
    </View>
  );
};
const PostImage = ({post}) => {
  return (
    <View style={styles.postImageContainer}>
      <Image style={styles.picture} source={{uri: post.picture}} />
    </View>
  );
};
const PostFooter = ({post}) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.iconsContainer}>
        <View style={styles.leftIconsContainer}>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/hearti.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/comment.png')} />
          </TouchableOpacity>
          <TouchableOpacity>
            <Image source={require('../../../assets/images/share.png')} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity>
          <Image source={require('../../../assets/images/bookmark.png')} />
        </TouchableOpacity>
      </View>
      <View>
        <Text style={{color: 'white', fontWeight: '700'}}>
          {post.likes} Likes
        </Text>
      </View>
      <Captions post={post} />
      {post.comments && post.comments.length >= 1 && (
        <CommentsSection post={post} />
      )}
    </View>
  );
};
const Captions = ({post}) => {
  return (
    <View style={{flexDirection: 'row'}}>
      <Text style={styles.nameText}>{post.user.toLowerCase()}</Text>
      <Text style={{color: 'white', marginStart: 4}} numberOfLines={2}>
        {post.caption}
      </Text>
    </View>
  );
};
const CommentsSection = ({post}) => {
  return (
    <View style={{marginRight: 80}}>
      <Text style={{color: '#888'}}>
        View all {post.comments.length}{' '}
        {post.comments.length > 1 ? 'comments' : 'comment'}
      </Text>
      {post.comments.map((comment, index) => {
        return (
          <View style={{flexDirection: 'row'}} key={index}>
            <Text style={styles.nameText}>{comment.user}</Text>
            <Text numberOfLines={1} style={{color: 'white'}}>
              {' '}
              {comment.comment}
            </Text>
          </View>
        );
      })}
    </View>
  );
};
const Post = ({post}) => {
  return (
    <View style={styles.container}>
      <PostHeader post={post} />
      <PostImage post={post} />
      <PostFooter post={post} />
    </View>
  );
};
const styles = StyleSheet.create({
  leftIconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: 100,
    justifyContent: 'space-around',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    paddingStart: 0,
  },
  footerContainer: {
    paddingHorizontal: 8,
  },
  postImageContainer: {
    width: '100%',
    height: 450,
  },
  picture: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  nameText: {
    color: 'white',
    fontWeight: '700',
  },
  rightHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  imageAvt: {
    width: 36,
    aspectRatio: 1,
    borderRadius: 48,
    margin: 8,
  },
  headerContainer: {
    paddingTop: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  divider: {
    height: 0.6,
    backgroundColor: 'white',
  },
  container: {
    marginTop: 30,
  },
});
export default Post;
