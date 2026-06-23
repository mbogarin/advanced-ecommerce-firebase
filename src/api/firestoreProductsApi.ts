import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export async function fetchProducts() {
	const snapshot = await getDocs(collection(db, "products"));

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
}
