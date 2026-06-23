import {
	collection,
	doc,
	getDoc,
	getDocs,
	updateDoc,
	deleteDoc,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export interface Product {
	id: string;
	title: string;
	price: number | string;
	category: string;
	description: string;
	image: string;
	rating?: {
		rate: number;
		count: number;
	};
}

// 1. Fetch products:
export async function fetchProducts(): Promise<Product[]> {
	const snapshot = await getDocs(collection(db, "products"));

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Product, "id">),
	}));
}

// 2. Fetch product by ID:
export async function fetchProductById(id: string): Promise<Product> {
	const productRef = doc(db, "products", id);

	const snapshot = await getDoc(productRef);

	if (!snapshot.exists()) {
		throw new Error("Product not found");
	}

	return {
		id: snapshot.id,
		...(snapshot.data() as Omit<Product, "id">),
	};
}

// 3. Update product:
export async function updateProduct(
	id: string,
	updatedProduct: Omit<Product, "id">,
): Promise<void> {
	const productRef = doc(db, "products", id);

	await updateDoc(productRef, updatedProduct);
}

// 4. Delete product:
export async function deleteProduct(id: string): Promise<void> {
	const productRef = doc(db, "products", id);
	await deleteDoc(productRef);
}
