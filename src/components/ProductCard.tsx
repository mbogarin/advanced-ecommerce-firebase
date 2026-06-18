import { useDispatch } from "react-redux";
import { addToCart } from "../store/cartSlice";

type Product = {
	id: number;
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
						"https://via.placeholder.com/120";
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
				<button
					className="btn btn-primary mt-auto"
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
			</div>
		</div>
	);
}
