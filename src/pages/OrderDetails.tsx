import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { fetchOrderById } from "../api/firestoreOrdersApi";

export default function OrderDetails() {
	const { id } = useParams();

	const {
		data: order,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["order", id],
		queryFn: () => fetchOrderById(id!),
		enabled: !!id,
	});

	if (isLoading) {
		return <div className="container py-4">Loading order...</div>;
	}

	if (isError || !order) {
		return <div className="container py-4">Order not found.</div>;
	}

	const date = order.createdAt?.toDate
		? order.createdAt.toDate()
		: order.createdAt
			? new Date(order.createdAt)
			: new Date();

	return (
		<div className="container py-4">
			<h1 className="mb-4">Order Details</h1>

			<p>
				<strong>Order ID:</strong> {order.id}
			</p>

			<p>
				<strong>Date:</strong> {date.toLocaleString()}
			</p>

			<p>
				<strong>Total:</strong> ${order.total.toFixed(2)}
			</p>

			<hr />

			<h3>Products</h3>

			{order.items?.map((item: any) => (
				<div key={item.id} className="card mb-3 p-3">
					<h5>{item.title}</h5>

					<p>Price: ${item.price.toFixed(2)}</p>

					<p>Quantity: {item.quantity}</p>

					<img
						src={item.image}
						alt={item.title}
						style={{
							width: "100px",
							height: "100px",
							objectFit: "contain",
						}}
						onError={(e) => {
							(e.target as HTMLImageElement).src =
								"https://placehold.co/100x100";
						}}
					/>
				</div>
			))}
		</div>
	);
}
