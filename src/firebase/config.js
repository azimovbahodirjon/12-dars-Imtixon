import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyBgwZC97auqLM87TNGZ6735ZUC532RePMg",
  authDomain: "invoice-app-caac0.firebaseapp.com",
  projectId: "invoice-app-caac0",
  storageBucket: "invoice-app-caac0.firebasestorage.app",
  messagingSenderId: "309115593228",
  appId: "1:309115593228:web:0d96cdf3de2f0f6cbd4429",
};
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
