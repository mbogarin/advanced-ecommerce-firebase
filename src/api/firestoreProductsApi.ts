import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

// 1. Fetch products:
export async function fetchProducts() {
	const snapshot = await getDocs(collection(db, "products"));

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
}

// 2. Fetch product by ID:
export async function fetchProductById(id: string) {
	const productRef = doc(db, "products", id);

	const snapshot = await getDoc(productRef);

	if (!snapshot.exists()) {
		throw new Error("Product not found");
	}

	return {
		id: snapshot.id,
		...snapshot.data(),
	};
}

// 3. Update product:
export async function updateProduct(
	id: string,
	updatedProduct: {
		title: string;
		price: number;
		category: string;
		description: string;
		image: string;
	},
) {
	const productRef = doc(db, "products", id);

	await updateDoc(productRef, updatedProduct);
}
