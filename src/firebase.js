import firebase from 'firebase/app';
import { getAnalytics } from "firebase/analytics";
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyAkvXpHXGToOXqT2cqRjee6iA_PvGDRahQ",
    authDomain: "reactfirbasedemoform.firebaseapp.com",
    projectId: "reactfirbasedemoform",
    storageBucket: "reactfirbasedemoform.appspot.com",
    messagingSenderId: "1079098216173",
    appId: "1:1079098216173:web:89be0eef5abee36fb986e4",
    measurementId: "G-V1MZZJXWW7"
    // Add other Firebase configuration properties here
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const analytics = getAnalytics(app);


// Export Firebase modules if needed
export const auth = firebase.auth();
export const firestore = firebase.firestore();