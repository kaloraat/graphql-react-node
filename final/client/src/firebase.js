import * as firebase from 'firebase';
// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: 'AIzaSyA5EkxSPBgCm_K3hhHnZF1GyAFIXaSmYH4',
  authDomain: 'gqlreactnode99.firebaseapp.com',
  // databaseURL: 'https://gqlreactnode99.firebaseio.com',
  projectId: 'gqlreactnode99',
  storageBucket: 'gqlreactnode99.appspot.com',
  // messagingSenderId: '985266742688',
  appId: '1:985266742688:web:f6f59bf21efd2add3c70c5',
  measurementId: 'G-MTHN9B9VT9'
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export const auth = firebase.auth();
export const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
