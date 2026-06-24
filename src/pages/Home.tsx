import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

// import {
// 	fetchProducts,
// 	fetchCategories,
// 	fetchProductsByCategory,
// } from "../api/fakeStoreApi";

import { fetchProducts, type Product } from "../api/firestoreProductsApi";
export default function Home() {
	const [alert, setAlert] = useState<{
		type: "success" | "danger";
		message: string;
	} | null>(null);

	// const [selectedCategory, setSelectedCategory] = useState("all");

	// = Get categories:
	// const { data: categories } = useQuery({
	// 	queryKey: ["categories"],
	// 	queryFn: fetchCategories,
	// });

	// = Get products (ALL or by category):
	// const {
	// 	data: products,
	// 	isLoading,
	// 	isError,
	// } = useQuery({
	// 	queryKey: ["products", selectedCategory],
	// 	queryFn: () =>
	// 		selectedCategory === "all"
	// 			? fetchProducts()
	// 			: fetchProductsByCategory(selectedCategory),
	// });

	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	if (isLoading) return <div>Loading products...</div>;
	if (isError) return <div>Failed to load products</div>;

	return (
		<div className="container py-4">
			<h1 className="mb-4 fw-semibold">Products</h1>

			{alert && (
				<div
					className={`alert alert-${alert.type} py-1 mb-2`}
					role="alert"
				>
					{alert.message}
				</div>
			)}

			{/* CATEGORY DROPDOWN: */}
			{/* <select
				className="form-select w-auto mb-4"
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				<option value="all">ALL</option>

				{categories?.map((cat: string) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select> */}

			{/* PRODUCTS: */}
			<div className="row g-4">
				{products?.map((product: Product) => (
					<div
						key={product.id}
						className="col-12 col-sm-6 col-md-5 col-lg-4"
					>
						<ProductCard product={product} setAlert={setAlert} />
					</div>
				))}
			</div>
		</div>
	);
}
