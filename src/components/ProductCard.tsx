import { useDispatch } from "react-redux";
// import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";
import { deleteProduct, type Product } from "../api/firestoreProductsApi";

// ProductCard Component:
export default function ProductCard({
	product,
	setAlert,
}: {
	product: Product;
	setAlert: (
		alert: {
			type: "success" | "danger";
			message: string;
		} | null,
	) => void;
}) {
	const dispatch = useDispatch();
	const queryClient = useQueryClient();

	// Add to Cart:
	const handleAddToCart = () => {
		dispatch(
			addToCart({
				id: product.id,
				title: product.title,
				price: Number(product.price),
				image: product.image,
			}),
		);

		setAlert({ type: "success", message: "Added to cart!" });
		setTimeout(() => setAlert(null), 2000);
	};

	// Delete:
	const handleDelete = async () => {
		const confirmDelete = window.confirm(
			"Are you sure you want to delete this product?",
		);

		if (!confirmDelete) return;

		await deleteProduct(product.id);

		queryClient.invalidateQueries({ queryKey: ["products"] });

		setAlert({ type: "danger", message: "Product deleted successfully" });
		setTimeout(() => setAlert(null), 3000);
	};

	return (
		<div className="card h-100">
			<img
				src={product.image}
				alt={product.title}
				className="card-img-top px-3 pt-3"
				style={{ height: "240px", width: "100%", objectFit: "cover" }}
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						"https://placehold.co/150x150";
				}}
			/>
			<div className="card-body d-flex flex-column">
				<h5 className="card-title fw-bold mb-2">{product.title}</h5>

				<span className="badge bg-dark-subtle text-dark px-2 py-1 rounded-pill align-self-start mb-2">
					{product.category}
				</span>

				<p className="fw-bold text-success mb-1">${product.price}</p>

				<p className="small text-muted mb-2">
					Rating: {product.rating?.rate ?? "N/A"}
				</p>

				<p className="small text-truncate mb-2">
					{product.description}
				</p>

				{/* Add to Cart Button: */}
				<div className="mt-auto">
					<button
						className="btn btn-sm btn-primary w-100 mb-2"
						// onClick={() =>
						// 	dispatch(
						// 		addToCart({
						// 			id: product.id,
						// 			title: product.title,
						// 			price: Number(product.price),
						// 			image: product.image,
						// 		}),
						// 	)
						// }
						onClick={handleAddToCart}
					>
						Add to Cart
					</button>

					{/* Edit Product: */}
					<Link
						to={`/edit-product/${product.id}`}
						className="btn btn-sm btn-outline-secondary w-100"
					>
						Edit Product
					</Link>

					{/* Delete Product: */}
					<button
						className="btn btn-sm btn-danger w-100 mt-2"
						onClick={handleDelete}
					>
						Delete Product
					</button>
				</div>
			</div>
		</div>
	);
}
