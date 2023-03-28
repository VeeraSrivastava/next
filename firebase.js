import * as firebase from "firebase/app";
import { getAuth, sendSignInLinkToEmail ,isSignInWithEmailLink,signInWithEmailLink} from "firebase/auth";
// import {storage} from "firebase";
import { getStorage,ref as Sref,uploadBytes,getDownloadURL,listAll,list} from "firebase/storage";
import { getDatabase,ref,set,onValue,get } from "firebase/database";
const firebaseConfig = {

  apiKey: "AIzaSyAIfpudEtk7LHj6LzrklsE9c4BomRytzJU",

  authDomain: "blog-2ba4f.firebaseapp.com",

  databaseURL: "https://blog-2ba4f-default-rtdb.firebaseio.com",

  projectId: "blog-2ba4f",

  storageBucket: "blog-2ba4f.appspot.com",

  messagingSenderId: "24919826708",

  appId: "1:24919826708:web:0cc5fbf19b9c30e343a201",

  measurementId: "G-THK94Z0MB4"

};




const app = firebase.initializeApp(firebaseConfig);
const database = getDatabase(app);
// const dataRef = ref(database, 'path/to/data');
const storage = getStorage(app);
const auth = getAuth(app);
export { database,ref,set ,onValue,get,getStorage,Sref,uploadBytes,getDownloadURL,storage,list,listAll,auth ,sendSignInLinkToEmail,isSignInWithEmailLink,signInWithEmailLink};
