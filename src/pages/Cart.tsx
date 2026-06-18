import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import type { RootState } from "../store/store";
import { removeFromCart, clearCart } from "../store/cartSlice";

export default function Cart() {
	const dispatch = useDispatch();
	const [checkoutMessage, setCheckoutMessage] = useState("");
	const cartItems = useSelector((state: RootState) => state.cart.items);

	// = Calculate total Products/Price:
	const totalProducts = cartItems.reduce(
		(total, item) => total + item.quantity,
		0,
	);
	const totalPrice = cartItems.reduce(
		(total, item) => total + item.price * item.quantity,
		0,
	);

	// = Checkout:
	const handleCheckout = () => {
		dispatch(clearCart());
		sessionStorage.removeItem("cart");
		setCheckoutMessage("Checkout successful! You cart has been cleared.");
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4 fw-semibold">Shopping Cart</h1>

			{/* Checkout Message: */}
			{checkoutMessage && <p>{checkoutMessage}</p>}

			<div className="mb-4">
				<h5>Total Products: {totalProducts}</h5>
				<h5>Total Price: ${totalPrice.toFixed(2)}</h5>
			</div>

			{/* // = CART ITEMS */}
			{cartItems.length === 0 ? (
				<p>Your cart is empty.</p>
			) : (
				cartItems.map((item) => (
					<div key={item.id} className="card mb-3 shadow-md">
						<div className="row g-0 align-items-center p-3">
							{/* Image: */}
							<div className="col-3">
								<img
									src={item.image}
									alt={item.title}
									className="img-fluid p-1"
									style={{
										height: "80px",
										objectFit: "contain",
									}}
									// width={100}
									onError={(e) => {
										(e.target as HTMLImageElement).src =
											"https://via.placeholder.com/100";
									}}
								/>
							</div>

							{/* Text: */}
							<div className="col-6">
								<h5 className="fw-semibold mb-2">
									{item.title}
								</h5>
								<h6 className="mb-0">
									Price: ${item.price.toFixed(2)}
								</h6>
								<p className="mb-0">
									Quantity: {item.quantity}
								</p>
							</div>

							{/*//= Remove from Cart button: */}
							<div className="col-3 text-end">
								<button
									className="btn btn-danger btn-sm"
									onClick={() =>
										dispatch(removeFromCart(item.id))
									}
								>
									Remove
								</button>
							</div>
						</div>
					</div>
				))
			)}
			{/* Checkout button: */}
			{cartItems.length > 0 && (
				<div className="text-end mt-3">
					<button
						className="btn btn-success"
						onClick={handleCheckout}
					>
						Checkout
					</button>
				</div>
			)}
		</div>
	);
}
