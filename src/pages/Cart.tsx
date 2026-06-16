import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/cartSlice";

export default function Cart() {
	const dispatch = useDispatch();

	const [checkoutMessage, setCheckoutMessage] = useState("");

	const cartItems = useSelector((state: RootState) => state.cart.items);

	const totalProducts = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);

	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	const handleCheckout = () => {
		dispatch(clearCart());

		sessionStorage.removeItem("cart");

		setCheckoutMessage("Checkout successful! You cart has been cleared.");
	};

	return (
		<div>
			<h1>Shopping Cart</h1>

			{/* CHECKOUT: */}
			{checkoutMessage && <p>{checkoutMessage}</p>}
			<h2>Total Products: {totalProducts}</h2>
			<h2>Total Price: ${totalPrice.toFixed(2)}</h2>

			{/* CART ITEMS */}
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cartItems.map((item) => (
					<div key={item.id}>
						<img
							src={item.image}
							alt={item.title}
							width={100}
							onError={(e) => {
								(e.target as HTMLImageElement).src =
									"https://via.placeholder.com/100";
							}}
						/>

						<h3>{item.title}</h3>
						<p>Price: ${item.price}</p>
						<p>Quantity: {item.quantity}</p>

						{/* REMOVE FROM CART BUTTON: */}
						<button
							onClick={() => dispatch(removeFromCart(item.id))}
						>
							Remove
						</button>

						{/* CHECKOUT BUTTON: */}
						<button onClick={handleCheckout}>Checkout</button>
					</div>
				))
			)}
		</div>
	);
}
