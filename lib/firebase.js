// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeH-pIPu_VcL-NAs5ThjoRXq1xd2AiSIk",
  authDomain: "notecloud-a73b3.firebaseapp.com",
  projectId: "notecloud-a73b3",
  storageBucket: "notecloud-a73b3.appspot.com",
  messagingSenderId: "1038518876982",
  appId: "1:1038518876982:web:d89dde117391f163bc9197",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Storage
const storage = getStorage(app);

export { storage };
