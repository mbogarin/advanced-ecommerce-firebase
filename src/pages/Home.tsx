import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import ProductCard from "../components/ProductCard";

import {
	fetchProducts,
	fetchCategories,
	fetchProductsByCategory,
} from "../api/fakeStoreApi";

export default function Home() {
	const [selectedCategory, setSelectedCategory] = useState("all");

	// = Get categories:
	const { data: categories } = useQuery({
		queryKey: ["categories"],
		queryFn: fetchCategories,
	});

	// = Get products (ALL or by category):
	const {
		data: products,
		isLoading,
		isError,
	} = useQuery({
		queryKey: ["products", selectedCategory],
		queryFn: () =>
			selectedCategory === "all"
				? fetchProducts()
				: fetchProductsByCategory(selectedCategory),
	});

	if (isLoading) return <div>Loading products...</div>;
	if (isError) return <div>Failed to load products</div>;

	return (
		<div>
			<h1>Products</h1>

			{/* // -- style later */}

			{/* CATEGORY DROPDOWN: */}
			<select
				value={selectedCategory}
				onChange={(e) => setSelectedCategory(e.target.value)}
			>
				<option value="all">ALL</option>

				{categories?.map((cat: string) => (
					<option key={cat} value={cat}>
						{cat}
					</option>
				))}
			</select>

			{/* // ! style later */}
			{/* PRODUCTS: */}
			<div>
				{products?.map((product: any) => (
					<ProductCard key={product.id} product={product} />
				))}
			</div>
		</div>
	);
}
