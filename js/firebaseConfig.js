// /js/firebaseConfig.js

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCzmZ1KpfaSBNjRhnbBkRk7spt_UDkdCHc",
    authDomain: "samel-website.firebaseapp.com",
    databaseURL: "https://samel-website-default-rtdb.firebaseio.com/",
    projectId: "samel-website",
    storageBucket: "samel-website.appspot.com",
    messagingSenderId: "227424756635",
    appId: "1:227424756635:web:710d5fa7a550000241f73e",
    measurementId: "G-QT0PC3E2BG"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const database = firebase.database();
const auth = firebase.auth();


