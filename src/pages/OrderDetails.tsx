import { useQuery } from "@tanstack/react-query";
import { Link, useParams } from "react-router-dom";
import { fetchOrderById, type OrderItem } from "../api/firestoreOrdersApi";

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

	const createdAt = order.createdAt;
	const date =
		createdAt instanceof Date
			? createdAt
			: typeof createdAt === "string"
				? new Date(createdAt)
				: createdAt &&
					  typeof createdAt === "object" &&
					  "toDate" in createdAt
					? createdAt.toDate()
					: new Date();

	return (
		<div className="container py-4" style={{ maxWidth: "850px" }}>
			<h1 className="mb-2">Order Details</h1>
			<p className="text-muted mb-4">
				Review the items included in this order.
			</p>

			<p>
				<strong>Order ID:</strong> {order.id}
			</p>

			<p>
				<strong>Date:</strong> {date.toLocaleString()}
			</p>

			<p>
				<strong>Total:</strong> ${order.total.toFixed(2)}
			</p>

			<Link
				to="/orders"
				className="btn btn-outline-secondary btn-sm mb-4"
			>
				← Back to Order History
			</Link>

			<hr />

			<h3 className="mb-3 ms-1 mt-4">Products</h3>

			{order.items?.map((item: OrderItem) => (
				<div key={item.id} className="card mb-3 p-3 shadow-sm">
					<div className="row align-items-center g-3">
						<div className="col-md-3 text-center">
							<img
								src={item.image}
								alt={item.title}
								className="img-fluid rounded border bg-light p-2"
								style={{
									width: "150px",
									height: "150px",
									objectFit: "contain",
								}}
								onError={(e) => {
									(e.target as HTMLImageElement).src =
										"https://placehold.co/150x150";
								}}
							/>
						</div>
						<div className="col-md-9">
							<h5 className="fw-semibold mb-3">{item.title}</h5>
							<p className="mb-2">
								<strong>Price:</strong> ${item.price.toFixed(2)}
							</p>
							<p className="mb-0">
								<strong>Quantity:</strong> {item.quantity}
							</p>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
