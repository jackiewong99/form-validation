import firebase from 'firebase/app';
import 'firebase/firestore';

const firebaseApp = firebase.initializeApp({
  // Firebase config data
  apiKey: 'AIzaSyCw024XZGMh_q81aqkndIOmX12F5JH5tN8',
  authDomain: 'form-validation-29df6.firebaseapp.com',
  databaseURL: 'https://form-validation-29df6.firebaseio.com',
  projectId: 'form-validation-29df6',
  storageBucket: 'form-validation-29df6.appspot.com',
  messagingSenderId: '50347228462',
  appId: '1:50347228462:web:0188a202488c84d8274ebf'
});

const db = firebaseApp.firestore();

// Export the database
export { db };
