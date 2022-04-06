import React from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {useNavigation} from '@react-navigation/native';

const Header = () => {
  const navigation = useNavigation();
  const goToCreatePost = () => {
    navigation.navigate('NewPostScreen');
  };
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <Image
          source={require('../../../assets/images/logo.png')}
          style={styles.image}
        />
      </TouchableOpacity>
      <View style={styles.iconsContainer}>
        <TouchableOpacity onPress={goToCreatePost}>
          <Image
            source={require('../../../assets/images/add.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require('../../../assets/images/hearti.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <View style={styles.unreadBage}>
            <Text style={styles.unreadBageText}>100</Text>
          </View>
          <Image
            source={require('../../../assets/images/messenger.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  unreadBage: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#ff3250',
    borderRadius: 38,
    position: 'absolute',
    left: 14,
    bottom: 12,
    width: 25,
    height: 18,
    zIndex: 1,
  },
  unreadBageText: {
    color: 'white',
    fontWeight: '600',
  },
  icon: {
    marginHorizontal: 4,
    width: 25,
    height: 25,
    resizeMode: 'contain',
  },
  iconsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  image: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
});
export default Header;
