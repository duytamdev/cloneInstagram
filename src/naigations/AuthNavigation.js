import React, {useEffect, useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {SignedInStack, SignedOutStack} from './index';
import {auth} from '../config/firebase';
import {onAuthStateChanged} from 'firebase/auth';

const AuthNavigation = () => {
  const [currentUser, setCurrentUser] = useState(null);
  const userHandler = user => {
    user ? setCurrentUser(user) : setCurrentUser(null);
  };
  useEffect(() => onAuthStateChanged(auth, user => userHandler(user)), []);

  return <>{currentUser ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;
