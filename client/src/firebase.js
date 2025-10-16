// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-7e58c.firebaseapp.com",
  projectId: "mern-blog-7e58c",
  storageBucket: "mern-blog-7e58c.firebasestorage.app",
  messagingSenderId: "1043335773383",
  appId: "1:1043335773383:web:2b323569e7d8d594d252e2",
  measurementId: "G-QHJ942X6LG"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);


export const auth = getAuth(app);
// export const db = getFirestore(app);
