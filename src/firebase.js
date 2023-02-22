// import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth'
import { getStorage } from "firebase/storage";
import 'firebase/compat/database';
import { getFirestore } from "firebase/firestore";
import firebase from 'firebase/compat/app';



const firebaseConfig = {
  apiKey: "AIzaSyCsfGD-ZcNoXITJeX_Q9Ch8dSkdGInBjLM",
  authDomain: "english-gyani-annotation.firebaseapp.com",
  databaseURL: "https://english-gyani-annotation-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "english-gyani-annotation",
  storageBucket: "english-gyani-annotation.appspot.com",
  messagingSenderId: "335368396365",
  appId: "1:335368396365:web:d22a2d2e2c70d7eef54604"
};

// Initialize Firebase

firebase.initializeApp(firebaseConfig);


// const app = initializeApp(firebaseConfig);
var auth = getAuth()
var storage = getStorage();
// const database = getDatabase()
firebase.initializeApp(firebaseConfig);
var database = firebase.database()

const db = getFirestore();



export { auth,storage,database,db }