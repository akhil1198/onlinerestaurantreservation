import * as firebase from 'firebase'
import dotenv from 'dotenv'

console.log(process.env.REACT_APP_FIREBASE_KEY)

//web app's Firebase configuration
var firebaseConfig = {

  apiKey: "AIzaSyB5cw-49nUqY8C722B_MCwR1zJkaWChmng",
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE,
  projectId: "hotelreservation-55a99",
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID

};
// Initialize Firebase
export var Firebase = firebase.initializeApp(firebaseConfig);

// export var firestore = firebase.database().ref(); 

export var firedb = firebase.firestore()