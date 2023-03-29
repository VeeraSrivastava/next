import * as firebase from "firebase/app";
import { getAuth, sendSignInLinkToEmail ,isSignInWithEmailLink,signInWithEmailLink} from "firebase/auth";
// import {storage} from "firebase";
import { getStorage,ref as Sref,uploadBytes,getDownloadURL,listAll,list} from "firebase/storage";
import { getDatabase,ref,set,onValue,get } from "firebase/database";
const firebaseConfig = {

  apiKey: "AIzaSyBXOen4nsT9jqhsmOxDYRNarCwnsfHHYHo",

  authDomain: "lt-cdr-bijay-nair.firebaseapp.com",

  databaseURL: "https://lt-cdr-bijay-nair-default-rtdb.firebaseio.com",

  projectId: "lt-cdr-bijay-nair",

  storageBucket: "lt-cdr-bijay-nair.appspot.com",

  messagingSenderId: "646358313893",

  appId: "1:646358313893:web:f1ca93c2413ddea3c3964c",

  measurementId: "G-JSX5KQBM9B"

};



const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
// const dataRef = ref(database, 'path/to/data');
const storage = getStorage(app);
const auth = getAuth(app);
export { database,ref,set ,onValue,get,getStorage,Sref,uploadBytes,getDownloadURL,storage,list,listAll,auth ,sendSignInLinkToEmail,isSignInWithEmailLink,signInWithEmailLink};
