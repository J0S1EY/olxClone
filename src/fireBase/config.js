import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth'; // Import Firebase Authentication
import { getStorage } from 'firebase/storage'; // Import Firebase Storage

const firebaseConfig = {
  apiKey: "AIzaSyBToIx9Jo4CzPW-t4blLMd0rGDDhNoxX6c",
  authDomain: "olxclone-c4488.firebaseapp.com",
  projectId: "olxclone-c4488",
  storageBucket: "olxclone-c4488.appspot.com",
  messagingSenderId: "1055656725827",
  appId: "1:1055656725827:web:a729fbd7764ff17f4f33f6",
  measurementId: "G-352L2LQBMJ"

};

const app = initializeApp(firebaseConfig);
const fireBase = getFirestore(app);
const auth = getAuth(app);
const storage = getStorage(app); // Initialize Firebase Storage

export { fireBase, auth, storage };
