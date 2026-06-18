import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

export default function App() {
	// Calculate NavBar cart items:
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	return (
		<div>
			{/* Nav links */}
			<nav className="navbar navbar-light bg-light px-3 border-bottom">
				{/* Shop */}
				<Link className="navbar-brand fw-semibold" to="/">
					Shop
				</Link>

				<div className="d-flex gap-3 align-items-center">
					{/* Home */}
					<Link className="nav-link" to="/">
						Home
					</Link>
					{/* Cart */}
					<Link className="nav-link" to="/cart">
						Cart ({totalItems})
					</Link>
				</div>
			</nav>

			<Routes>
				{/* Home page: */}
				<Route path="/" element={<Home />} />

				{/* Cart page: */}
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	);
}
