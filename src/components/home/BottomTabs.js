import React, {useState} from 'react';
import {Text, View, StyleSheet, Image, TouchableOpacity} from 'react-native';
const MyDivider = () => {
  return <View style={{height: 0.6, backgroundColor: 'white'}} />;
};
const BottomTabs = () => {
  const [activeTab, setActiveTab] = useState('Home');
  return (
    <View>
      <MyDivider />
      <View style={styles.container}>
        <TouchableOpacity onPress={() => setActiveTab('Home')}>
          <Image
            style={styles.icon}
            source={
              activeTab === 'Home'
                ? require('../../../assets/images/homefill.png')
                : require('../../../assets/images/Home.png')
            }
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Search')}>
          <Image
            style={styles.icon}
            source={require('../../../assets/images/Search.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Reels')}>
          <Image
            style={styles.icon}
            source={require('../../../assets/images/Reels.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Shop')}>
          <Image
            style={styles.icon}
            source={require('../../../assets/images/Shop.png')}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => setActiveTab('Account')}>
          <Image
            style={[styles.icon, styles.iconImage]}
            source={{
              uri: 'https://i.pinimg.com/564x/b5/a4/98/b5a498a15d8a0e3cc4feb3492c5a33b9.jpg',
            }}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  iconImage: {
    borderRadius: 48,
    borderWidth: 1,
    borderColor: '#ff8903',
  },
  icon: {
    width: 24,
    height: 24,
    resizeMode: 'cover',
  },
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#000000',
    justifyContent: 'space-between',
    padding: 16,
  },
});
export default BottomTabs;
