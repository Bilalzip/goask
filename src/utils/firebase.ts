import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyAv6MKcbotSnzMignljb1tx-D580DDrDNU",
  authDomain: "goaskpdf.firebaseapp.com",
  projectId: "goaskpdf",
  storageBucket: "goaskpdf.appspot.com",
  messagingSenderId: "981979767754",
  appId: "1:981979767754:web:384a3082b4392e7511e533",
  measurementId: "G-6XG6Z9B756"
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
const analytics = getAnalytics(app);