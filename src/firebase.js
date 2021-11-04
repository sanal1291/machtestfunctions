import firebase from "firebase/app"
import "firebase/auth"
import "firebase/firestore"
import 'firebase/functions'
const firebaseConfig = {
    apiKey: "AIzaSyBtzSiV4dr_awuR1x02VvHD5a9jIG6DiFk",
    authDomain: "machtest-55001.firebaseapp.com",
    projectId: "machtest-55001",
    storageBucket: "machtest-55001.appspot.com",
    messagingSenderId: "316380609146",
    appId: "1:316380609146:web:e109b2a67ba6e54fbb59c3"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

if (window.location.hostname === 'localhost') {
    firebase.functions().useEmulator('localhost', 5001);
}
var functions = firebase.functions();
const auth = firebase.auth()
const db = firebase.firestore()
const users = db.collection('users')
export {
    auth,
    users,
    db,
    functions
}