import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
	apiKey: "AIzaSyAmo3xsfbnhHousyf1vjE_KIrrHCPsU6qI",
	authDomain: "advanced-react-ecommerce-b2723.firebaseapp.com",
	projectId: "advanced-react-ecommerce-b2723",
	storageBucket: "advanced-react-ecommerce-b2723.firebasestorage.app",
	messagingSenderId: "812531402233",
	appId: "1:812531402233:web:6d4dfda47e24ef82b32928",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

export default app;
