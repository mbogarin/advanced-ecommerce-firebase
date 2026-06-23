import { useQuery } from "@tanstack/react-query";
import { auth } from "../firebase/firebaseConfig";
import { fetchOrders } from "../api/firestoreOrdersApi";
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
		return <div className="container py-4">Loading orders...</div>;

	if (isError) {
		return <div className="container py-4">Error loading orders.</div>;
	}

	return (
		<div className="container py-4">
			<h1 className="mb-4">Order History</h1>

			{orders?.length === 0 ? (
				<p>No orders found.</p>
			) : (
				orders?.map((order: any) => (
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
						<div className="card mb-4 p-3  shadow-sm">
							<h5 className="mb-4">
								Order ID:
								<span className="lead"> {order.id}</span>
							</h5>

							<p className="mb-3">
								<strong>Total:</strong> $
								{order.total.toFixed(2)}
							</p>

							<p>
								<strong>Date:</strong>{" "}
								{order.createdAt?.toDate
									? order.createdAt.toDate().toLocaleString()
									: new Date(
											order.createdAt,
										).toLocaleString()}
							</p>

							{/* View Details Row */}
							<div className="d-flex justify-content-end mt-1">
								<span
									className="text-primary fw-semibold text-decoration-none"
									style={{ cursor: "pointer" }}
								>
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
