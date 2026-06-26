import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";
import { useSelector } from "react-redux";
import type { RootState } from "./store/store";

// = firebase imports:
import { onAuthStateChanged, signOut } from "firebase/auth";
import type { User } from "firebase/auth";
import { auth } from "./firebase/firebaseConfig";
import { useEffect, useState } from "react";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Profile from "./pages/Profile";
import AddProduct from "./pages/AddProduct";
import EditProduct from "./pages/EditProduct";
import OrderHistory from "./pages/OrderHistory";
import OrderDetails from "./pages/OrderDetails";

import AuthGuard from "./components/AuthGuard";

export default function App() {
	// state:
	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState(true);
	const [open, setOpen] = useState(false);

	// auth listener:
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

	// handle logout:
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
			<nav className="navbar navbar-expand-lg navbar-light bg-light px-3 border-bottom">
				<div className="container-fluid">
					{/* Shop */}
					<Link className="navbar-brand fw-semibold" to="/">
						Shop
					</Link>

					<div className="d-flex ms-auto align-items-center">
						<div className="d-flex gap-3 align-items-center">
							<Link className="nav-link" to="/">
								Home
							</Link>

							<Link className="nav-link" to="/add-product">
								Add Product
							</Link>

							<Link className="nav-link" to="/orders">
								Order History
							</Link>

							{/* Cart */}
							<Link className="nav-link me-2" to="/cart">
								Cart ({totalItems})
							</Link>

							{/* AUTH LINKS: */}
							{user ? (
								<div className="position-relative">
									<button
										className="btn btn-outline-secondary"
										onClick={() => setOpen(!open)}
									>
										Account
									</button>

									{open && (
										<ul className="dropdown-menu show position-absolute end-0 mt-2">
											<li>
												<Link
													className="dropdown-item"
													to="/profile"
												>
													Profile
												</Link>
											</li>

											<li>
												<hr className="dropdown-divider" />{" "}
											</li>

											<li>
												<button
													className="dropdown-item text-danger"
													onClick={handleLogout}
												>
													Logout
												</button>
											</li>
										</ul>
									)}
								</div>
							) : (
								<div className="d-flex gap-2 align-items-center">
									<Link
										className="btn btn-outline-primary btn-sm"
										to="/login"
									>
										Sign in
									</Link>

									<Link
										className="btn btn-primary btn-sm"
										to="/register"
									>
										Get started
									</Link>
								</div>
							)}
						</div>
					</div>
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

				<Route
					path="/add-product"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<AddProduct />
						</AuthGuard>
					}
				/>

				<Route
					path="/edit-product/:id"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<EditProduct />
						</AuthGuard>
					}
				/>

				<Route
					path="/orders"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<OrderHistory />
						</AuthGuard>
					}
				/>

				<Route
					path="/orders/:id"
					element={
						<AuthGuard
							user={user}
							requireAuth={true}
							redirectTo="/login"
						>
							<OrderDetails />
						</AuthGuard>
					}
				/>

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
