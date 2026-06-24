import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AddProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState("");
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");
	const [category, setCategory] = useState("");

	const [rating, setRating] = useState("");
	const [alert, setAlert] = useState<{
		type: "success" | "danger";
		message: string;
	} | null>(null);

	const navigate = useNavigate();

	const DEFAULT_IMAGE = "https://placehold.co/150x150";

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		const imageToUse = image.trim() === "" ? DEFAULT_IMAGE : image.trim();

		await addDoc(collection(db, "products"), {
			title,
			price: Number(price),
			description,
			image: imageToUse,
			category,
			rating: {
				rate: parseFloat(rating),
				count: 0,
			},
		});

		setAlert({
			type: "success",
			message: "Product added successfully!",
		});

		setTimeout(() => {
			navigate("/");
		}, 1200);
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4">Add Product</h1>

			{alert && (
				<div className={`alert alert-${alert.type} text-center`}>
					{alert.message}
				</div>
			)}

			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<input
						className="form-control"
						placeholder="Title"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
						required
					/>
				</div>

				<div className="mb-3">
					<div className="input-group">
						<span className="input-group-text">$</span>
						<input
							className="form-control"
							type="number"
							placeholder="Price"
							value={price}
							onChange={(e) => setPrice(e.target.value)}
							required
						/>
					</div>
				</div>

				<div className="mb-3">
					<textarea
						className="form-control"
						placeholder="Description"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<input
						className="form-control"
						placeholder="Image URL"
						value={image}
						onChange={(e) => setImage(e.target.value)}
					/>
				</div>

				<div className="mb-3">
					<select
						className="form-control"
						value={category}
						onChange={(e) => setCategory(e.target.value)}
						required
					>
						<option value="">Select Category</option>
						<option value="men's clothing">Men's Clothing</option>
						<option value="women's clothing">
							Women's Clothing
						</option>
						<option value="electronics">Electronics</option>
						<option value="jewelry">Jewelry</option>
						<option value="home">Home</option>
						<option value="beauty">Beauty</option>
						<option value="sports">Sports</option>
						<option value="toys">Toys</option>
					</select>
				</div>

				<div className="mb-3">
					<input
						className="form-control"
						type="number"
						step="0.1"
						min="0"
						max="5"
						placeholder="Rating (0-5)"
						value={rating}
						onChange={(e) => setRating(e.target.value)}
					/>
				</div>

				<button className="btn btn-primary px-4">Add Product</button>
			</form>
		</div>
	);
}
