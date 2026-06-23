import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";
import { Link } from "react-router-dom";

type Product = {
	id: string;
	title: string;
	price: number;
	category: string;
	description: string;
	image: string;
	rating?: {
		rate: number;
		count: number;
	};
};

// = Reusable ProductCard Component:
export default function ProductCard({ product }: { product: Product }) {
	const dispatch = useDispatch();

	return (
		<div className="card h-100">
			<img
				src={product.image}
				alt={product.title}
				className="card-img-top p-3"
				style={{ height: "180px", objectFit: "contain" }}
				// width={120}
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						"https://placehold.co/120x120";
				}}
			/>
			<div className="card-body d-flex flex-column">
				<h5 className="card-title">{product.title}</h5>
				<p className="fw-bold mb-1">${product.price}</p>
				<p className="text-muted small mb-1">{product.category}</p>
				<p className="small mb-1">
					Rating: {product.rating?.rate ?? "N/A"}
				</p>
				<p className="small text-truncate">{product.description}</p>

				{/* // = Add to Cart Button: */}
				<div className="mt-auto">
					<button
						className="btn btn-primary w-100 mb-2"
						onClick={() =>
							dispatch(
								addToCart({
									id: product.id,
									title: product.title,
									price: product.price,
									image: product.image,
								}),
							)
						}
					>
						Add to Cart
					</button>

					<Link
						to={`/edit-product/${product.id}`}
						className="btn btn-outline-secondary w-100"
					>
						Edit Product
					</Link>
				</div>
			</div>
		</div>
	);
}
