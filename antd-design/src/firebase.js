import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCmk4pDM_nPs0mSXFFqaO6HczW4fgVdU6U",
  authDomain: "organiser-37dc2.firebaseapp.com",
  projectId: "organiser-37dc2",
  storageBucket: "organiser-37dc2.appspot.com",
  messagingSenderId: "788303103951",
  appId: "1:788303103951:web:112313606b18c3b31674ba"
};

const firebaseApp = firebase.initializeApp(firebaseConfig)
const auth = firebase.auth();
const provider = new firebase.auth.GoogleAuthProvider();

export { auth, provider };