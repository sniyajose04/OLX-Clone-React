
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';


const firebaseConfig = {
  apiKey: "AIzaSyBaIyp01EqDjppM1FFOf_zxZnSWOJs3p0I",
  authDomain: "react-olx-2df27.firebaseapp.com",
  projectId: "react-olx-2df27",
  storageBucket: "react-olx-2df27.appspot.com",
  messagingSenderId: "376213003534",
  appId: "1:376213003534:web:f29af8bc5065d28004cb5f",
  measurementId: "G-8XTDDTFZB0"
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const db = getFirestore(firebaseApp);
const storage = getStorage(firebaseApp);

export { firebaseApp, auth, db, storage };
