import * as firebase from 'firebase'
import '@firebase/auth'
import '@firebase/firestore'

const firebaseConfig = {
	apiKey: "AIzaSyANKJmTNqgdbAJQF9GZA4cgBOiE-mGn7uM",
    authDomain: "things-75037.firebaseapp.com",
    databaseURL: "https://things-75037.firebaseio.com",
    projectId: "things-75037",
    storageBucket: "things-75037.appspot.com",
    messagingSenderId: "643341792616",
    appId: "1:643341792616:web:5745286a6726c326a552dd"
}

if (!firebase.apps.length) {
	firebase.initializeApp(firebaseConfig)
}

export { firebase }