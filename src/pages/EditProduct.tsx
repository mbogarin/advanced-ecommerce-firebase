import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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

	useEffect(() => {
		if (product) {
			setTitle(product.title);
			setPrice(Number(product.price));
		}
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
			category: product.category,
			description: product.description,
			image: product.image,
		});

		alert("Product updated!");
		navigate("/");
	};

	return (
		<div className="container py-4">
			<h1>Edit Product</h1>

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
				<input
					type="number"
					className="form-control"
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
				/>
			</div>

			<button className="btn btn-primary" onClick={handleSave}>
				Save Changes
			</button>
		</div>
	);
}
