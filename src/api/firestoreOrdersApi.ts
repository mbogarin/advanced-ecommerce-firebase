import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
	Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export type OrderItem = {
	id: string;
	title: string;
	price: number;
	image: string;
	quantity: number;
};

// 1. reate order:
export async function createOrder(
	userId: string,
	items: OrderItem[],
	total: number,
) {
	return await addDoc(collection(db, "orders"), {
		userId,
		items,
		total,
		createdAt: Timestamp.now(),
	});
}

// 2. Fetch orders:
export async function fetchOrders(userId: string) {
	const ordersQuery = query(
		collection(db, "orders"),
		where("userId", "==", userId),
	);
	const snapshot = await getDocs(ordersQuery);

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...doc.data(),
	}));
}

// 3. Fetch order by ID:
export async function fetchOrderById(id: string) {
	const orderRef = doc(db, "orders", id);

	const snapshot = await getDoc(orderRef);

	if (!snapshot.exists()) {
		throw new Error("Order not found");
	}

	return {
		id: snapshot.id,
		...snapshot.data(),
	};
}
