import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

import { fetchProducts, type Product } from "../api/firestoreProductsApi";
export default function Home() {
	// State variables:
	const [alert, setAlert] = useState<{
		type: "success" | "danger";
		message: string;
	} | null>(null);

	const [selectedCategory, setSelectedCategory] = useState("all");

	// Get categories:
	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["products"],
		queryFn: fetchProducts,
	});

	// Filter Products (all or by-category):
	const categories = products
		? Array.from(
				new Set(
					products.map((p: Product) => p.category).filter(Boolean),
				),
			)
		: [];

	const filteredProducts =
		selectedCategory === "all"
			? products
				? products
				: []
			: products
				? products.filter(
						(p: Product) => p.category === selectedCategory,
					)
				: [];

	// Error Handling:
	if (isLoading) return <div>Loading products...</div>;
	if (isError) return <div>Failed to load products</div>;

	// UI:
	return (
		<div className="container py-4">
			<h1 className="mb-4 fw-semibold">Products</h1>

			{/* Alert message: */}
			{alert && (
				<div
					className={`alert alert-${alert.type} py-1 mb-2`}
					role="alert"
				>
					{alert.message}
				</div>
			)}

			{/* CATEGORY DROPDOWN: */}
			<div className="mb-4">
				<select
					className="form-select w-auto mb-4 shadow-sm"
					value={selectedCategory}
					onChange={(e) => setSelectedCategory(e.target.value)}
				>
					<option value="all">All Categories</option>

					{categories.map((cat: string) => (
						<option key={cat} value={cat}>
							{cat}
						</option>
					))}
				</select>
			</div>

			{/* PRODUCTS: */}
			<div className="row g-4">
				{filteredProducts?.map((product: Product) => (
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
