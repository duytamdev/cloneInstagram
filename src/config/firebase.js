import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCGwPJuNVZzoxYe3CfkUX7-Jsa8c4gwg-k',
  authDomain: 'rn-instagram-clone-ac38f.firebaseapp.com',
  projectId: 'rn-instagram-clone-ac38f',
  storageBucket: 'rn-instagram-clone-ac38f.appspot.com',
  messagingSenderId: '688627267948',
  appId: '1:688627267948:web:d62b4a1fef9a18ed44db49',
};

// Initialize Firebase
!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
