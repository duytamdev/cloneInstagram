import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
import NewPostScreen from '../screens/NewPostScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
const Stack = createNativeStackNavigator();
const screenOptions = {
  headerShown: false,
};
export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'HomeScreen'}>
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="NewPostScreen" component={NewPostScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName={'LoginScreen'}>
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="RegisterScreen" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};
