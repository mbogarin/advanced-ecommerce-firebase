import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

// = firebase imports:
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";
import Login from "./pages/Login";
import Register from "./pages/Register";

export default function App() {
	// Calculate NavBar cart items:
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	// = user state:
	const [user, setUser] = useState(null);

	// = auth listener:
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
		});

		return () => unsubscribe();
	}, []);

	// = handle logout:
	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("User logged out");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

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

					{/*//= Auth: */}
					{user ? (
						// > Logout button:
						<button
							className="btn btn-outline-danger btn-sm"
							onClick={handleLogout}
						>
							Logout
						</button>
					) : (
						<div>
							{/*//> Login button: */}
							<Link className="nav-link" to="/login">
								Login
							</Link>

							{/*//> Register button: */}
							<Link className="nav-link" to="/register">
								Register
							</Link>
						</div>
					)}
				</div>
			</nav>

			<Routes>
				{/* Home page: */}
				<Route path="/" element={<Home />} />

				{/* Cart page: */}
				<Route path="/cart" element={<Cart />} />

				{/*//= Login: */}
				<Route path="/login" element={<Login />} />

				{/*//= Register: */}
				<Route path="/register" element={<Register />} />
			</Routes>
		</div>
	);
}
