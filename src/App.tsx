import { Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import Cart from "./pages/Cart";

export default function App() {
	return (
		<div>
			<nav>
				<Link to="/">Home</Link> | <Link to="/cart">Cart</Link>
			</nav>

			<Routes>
				<Route path="/" element={<Home />} />

				<Route path="/cart" element={<Cart />} />
			</Routes>
		</div>
	);
}

// export default App;
