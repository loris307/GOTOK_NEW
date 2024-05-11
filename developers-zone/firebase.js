// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';


const firebaseConfig = {
  apiKey: "AIzaSyCiE7N1T3_p2jJPkGuxJMYuqjCb932PSAM",
  authDomain: "goflirt-ai-d8584.firebaseapp.com",
  projectId: "goflirt-ai-d8584",
  storageBucket: "goflirt-ai-d8584.appspot.com",
  messagingSenderId: "66699358202",
  appId: "1:66699358202:web:55a11f4c86815944003e43",
  measurementId: "G-6F1B50Q4QY"
};

const app = initializeApp(firebaseConfig);


const auth = getAuth(app);
const functions = getFunctions(app);


export { auth, functions };

