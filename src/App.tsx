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
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/editProduct";

import AuthGuard from "./components/AuthGuard";

export default function App() {
	// = user state:
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// = auth listener:
	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
			setUser(currentUser);
			setLoading(false);
		});

		return () => unsubscribe();
	}, []);

	// Calculate NavBar cart items:
	const cartItems = useSelector((state: RootState) => state.cart.items);
	const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

	// = handle logout:
	const handleLogout = async () => {
		try {
			await signOut(auth);
			console.log("User logged out");
		} catch (error) {
			console.error("Logout failed:", error);
		}
	};

	if (loading) {
		return <div className="container py-4">Loading...</div>;
	}

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

					<Link className="nav-link" to="/add-product">
						Add Product
					</Link>

					{/*//= AUTH LINKS: */}

					{user ? (
						// > Profile/Logout button:
						<div>
							<Link className="nav-link" to="/profile">
								Profile
							</Link>

							<button
								className="btn btn-outline-danger btn-sm"
								onClick={handleLogout}
							>
								Logout
							</button>
						</div>
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

			{/* ROUTES: */}
			<Routes>
				{/* Home page: */}
				<Route path="/" element={<Home />} />

				{/* Cart page: */}
				<Route
					path="/cart"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<Cart />
						</AuthGuard>
					}
				/>
				{/*//= Add Product:  */}
				<Route path="/add-product" element={<AddProduct />} />

				{/*//= Edit Product:  */}
				<Route path="/edit-product/:id" element={<EditProduct />} />

				{/*//= Login: */}
				<Route
					path="/login"
					element={
						<AuthGuard
							user={user}
							requireAuth={false}
							redirectTo="/"
						>
							<Login />{" "}
						</AuthGuard>
					}
				/>

				{/*//= Register: */}
				<Route
					path="/register"
					element={
						<AuthGuard
							user={user}
							requireAuth={false}
							redirectTo="/"
						>
							<Register />{" "}
						</AuthGuard>
					}
				/>

				{/*//= Profile: */}
				<Route
					path="/profile"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<Profile user={user} />{" "}
						</AuthGuard>
					}
				/>
			</Routes>
		</div>
	);
}
