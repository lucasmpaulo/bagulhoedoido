import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyCKy6ED-F0ZuUFhfG7a0CqZaQSAVYw_E-M",
  authDomain: "teste-do-heroi-2c00e.firebaseapp.com",
  projectId: "teste-do-heroi-2c00e",
  storageBucket: "teste-do-heroi-2c00e.appspot.com",
  messagingSenderId: "850818308555",
  appId: "1:850818308555:web:c7a8ac6af70f96c8707e4e"
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };