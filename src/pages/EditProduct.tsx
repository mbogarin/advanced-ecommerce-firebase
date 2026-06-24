import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { fetchProductById } from "../api/firestoreProductsApi";
import { updateProduct } from "../api/firestoreProductsApi";

export default function EditProduct() {
	const { id } = useParams();
	const navigate = useNavigate();

	const {
		data: product,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["product", id],
		queryFn: () => fetchProductById(id!),
		enabled: !!id,
	});

	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [category, setCategory] = useState("");
	const [rating, setRating] = useState("");
	const [alert, setAlert] = useState<{
		type: "success" | "danger";
		message: string;
	} | null>(null);

	useEffect(() => {
		if (!product) return;

		const timeoutId = window.setTimeout(() => {
			setTitle(product.title);
			setPrice(Number(product.price));
			setDescription(product.description || "");
			setCategory(product.category || "");
			setRating(product.rating?.rate?.toString() || "");
		}, 0);

		return () => window.clearTimeout(timeoutId);
	}, [product]);

	if (isLoading)
		return <div className="container py-4">Loading product...</div>;

	if (isError || !product) {
		return <div className="container py-4">Product not found.</div>;
	}

	const handleSave = async () => {
		await updateProduct(id!, {
			title,
			price,
			description,
			category,
			image: product.image,
			rating: {
				rate: parseFloat(rating),
				count: product.rating?.count || 0,
			},
		});

		setAlert({
			type: "success",
			message: "Product updated successfully!",
		});

		setTimeout(() => {
			navigate("/");
		}, 1300);
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4">Edit Product</h1>
			{alert && (
				<div className={`alert alert-${alert.type} text-center`}>
					{alert.message}
				</div>
			)}

			<div className="mb-3">
				<label className="form-label">Title</label>
				<input
					className="form-control"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Price</label>
				<div className="input-group">
					<span className="input-group-text">$</span>
					<input
						type="number"
						className="form-control"
						value={price}
						onChange={(e) => setPrice(Number(e.target.value))}
					/>
				</div>
			</div>

			<div className="mb-3">
				<label className="form-label">Description</label>
				<textarea
					className="form-control"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>
			</div>

			<div className="mb-3">
				<label className="form-label">Category</label>
				<select
					className="form-control"
					value={category}
					onChange={(e) => setCategory(e.target.value)}
				>
					<option value="">Select Category</option>
					<option value="men's clothing">Men's Clothing</option>
					<option value="women's clothing">Women's Clothing</option>
					<option value="electronics">Electronics</option>
					<option value="jewelry">Jewelry</option>
					<option value="home">Home</option>
					<option value="beauty">Beauty</option>
					<option value="sports">Sports</option>
					<option value="toys">Toys</option>
				</select>
			</div>

			<div className="mb-3">
				<label className="form-label">Rating</label>
				<input
					type="number"
					step="0.1"
					min="0"
					max="5"
					className="form-control"
					value={rating}
					onChange={(e) => setRating(e.target.value)}
				/>
			</div>

			<div className="d-flex gap-2">
				<button className="btn btn-primary px-4" onClick={handleSave}>
					Save Changes
				</button>

				<Link to="/" className="btn btn-outline-secondary">
					Back to Products
				</Link>
			</div>
		</div>
	);
}
