// Firebase initialization and export for REST usage
import { initializeApp } from "firebase/app";


const firebaseConfig = {
apiKey: "AIzaSyB5HcGsUn-wz4namNpsmaeSau4j3pS9vLE",
authDomain: "e-commerce-77db0.firebaseapp.com",
databaseURL: "https://e-commerce-77db0-default-rtdb.firebaseio.com/",
projectId: "e-commerce-77db0",
storageBucket: "e-commerce-77db0.firebasestorage.app",
messagingSenderId: "421374868662",
appId: "1:421374868662:web:b468ae7fc3d4450f6e7a17",
measurementId: "G-F5F5SHMFEC"
};


const app = initializeApp(firebaseConfig);


// helpful constant for REST calls
export const FIREBASE_DB_URL = firebaseConfig.databaseURL;


export default app;