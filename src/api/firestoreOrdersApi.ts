import {
	addDoc,
	collection,
	doc,
	getDoc,
	getDocs,
	query,
	where,
	Timestamp,
	type Timestamp as FirestoreTimestamp,
} from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export interface OrderItem {
	id: string;
	title: string;
	price: number;
	image: string;
	quantity: number;
}

export interface Order {
	id: string;
	userId: string;
	items: OrderItem[];
	total: number;
	createdAt?: FirestoreTimestamp | Date | string | null;
}

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
export async function fetchOrders(userId: string): Promise<Order[]> {
	const ordersQuery = query(
		collection(db, "orders"),
		where("userId", "==", userId),
	);
	const snapshot = await getDocs(ordersQuery);

	return snapshot.docs.map((doc) => ({
		id: doc.id,
		...(doc.data() as Omit<Order, "id">),
	}));
}

// 3. Fetch order by ID:
export async function fetchOrderById(id: string): Promise<Order> {
	const orderRef = doc(db, "orders", id);

	const snapshot = await getDoc(orderRef);

	if (!snapshot.exists()) {
		throw new Error("Order not found");
	}

	return {
		id: snapshot.id,
		...(snapshot.data() as Omit<Order, "id">),
	};
}
