import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export default function AddProduct() {
	const [title, setTitle] = useState("");
	const [price, setPrice] = useState(0);
	const [description, setDescription] = useState("");
	const [image, setImage] = useState("");

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
			category: "custom",
			rating: {
				rate: 0,
				count: 0,
			},
		});

		alert("Product added!");
		navigate("/");
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4">Add Product</h1>

			<form onSubmit={handleSubmit}>
				<input
					className="form-control mb-2"
					placeholder="Title"
					value={title}
					onChange={(e) => setTitle(e.target.value)}
				/>

				<input
					className="form-control mb-2"
					type="number"
					placeholder="Price"
					value={price}
					onChange={(e) => setPrice(Number(e.target.value))}
				/>

				<textarea
					className="form-control mb-2"
					placeholder="Description"
					value={description}
					onChange={(e) => setDescription(e.target.value)}
				/>

				<input
					className="form-control mb-2"
					placeholder="Image URL"
					value={image}
					onChange={(e) => setImage(e.target.value)}
				/>

				<button className="btn btn-primary mt-2">Add Product</button>
			</form>
		</div>
	);
}
