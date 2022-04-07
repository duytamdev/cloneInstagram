// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

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
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
