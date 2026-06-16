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

export default function ProductCard({ product }: { product: Product }) {
	const dispatch = useDispatch();

	return (
		// ! style later
		<div>
			<img
				src={product.image}
				alt={product.title}
				width={120}
				onError={(e) => {
					(e.target as HTMLImageElement).src =
						"https://via.placeholder.com/120";
				}}
			/>

			<h3>{product.title}</h3>
			<p>${product.price}</p>
			<p>{product.category}</p>
			<p>Rating: {product.rating?.rate ?? "N/A"}</p>
			<p>{product.description}</p>

			{/* Add to Cart Button: */}
			<button
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
	);
}
