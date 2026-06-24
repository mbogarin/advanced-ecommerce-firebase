import { useQuery } from "@tanstack/react-query";
import { auth } from "../firebase/firebaseConfig";
import { fetchOrders, type Order } from "../api/firestoreOrdersApi";
import { Link } from "react-router-dom";

export default function OrderHistory() {
	const user = auth.currentUser;

	const {
		data: orders,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["orders", user?.uid],
		queryFn: () => fetchOrders(user!.uid),
		enabled: !!user,
	});

	if (isLoading)
		return (
			<div className="container py-4" style={{ maxWidth: "850px" }}>
				Loading orders...
			</div>
		);

	if (isError) {
		return (
			<div className="container py-4" style={{ maxWidth: "850px" }}>
				Error loading orders.
			</div>
		);
	}

	return (
		<div className="container py-4" style={{ maxWidth: "850px" }}>
			<h1 className="mb-2">Order History</h1>
			<p className="text-muted mb-4">
				View your previous purchases and order details.
			</p>

			{orders?.length === 0 ? (
				<p>No orders found.</p>
			) : (
				orders?.map((order: Order) => (
					<Link
						key={order.id}
						to={`/orders/${order.id}`}
						style={{
							textDecoration: "none",
							color: "inherit",
							display: "block",
							marginBottom: "12px",
						}}
					>
						<div className="card mb-4 p-4 shadow-sm">
							<h5 className="fw-semibold mb-4">
								Order ID:{" "}
								<span className="text-primary text-decoration-underline">
									{order.id}
								</span>
							</h5>

							<p className="mb-2 fs-5 text-success ">
								<strong>Total:</strong> $
								{order.total.toFixed(2)}
							</p>

							<p className="text-muted mb-0">
								<strong>Order Date:</strong>{" "}
								{(() => {
									const createdAt = order.createdAt;
									if (createdAt instanceof Date) {
										return createdAt.toLocaleString();
									}

									if (typeof createdAt === "string") {
										return new Date(
											createdAt,
										).toLocaleString();
									}

									if (
										createdAt &&
										typeof createdAt === "object" &&
										"toDate" in createdAt
									) {
										return createdAt
											.toDate()
											.toLocaleString();
									}

									return "Unknown date";
								})()}
							</p>

							{/* View Details Row */}
							<div className="d-flex justify-content-end mt-0">
								<span className="btn btn-outline-primary btn-sm">
									View Details
								</span>
							</div>
						</div>
					</Link>
				))
			)}
		</div>
	);
}
