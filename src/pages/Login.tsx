import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase/firebaseConfig";

export default function Login() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleLogin = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			await signInWithEmailAndPassword(auth, email, password);
			alert("Login successful");
		} catch (err: any) {
			setError(err.message);
		}
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4">Login</h1>

			{/* Form: */}
			<form onSubmit={handleLogin} className="w-50">
				<input
					className="form-control mb-2"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<input
					className="form-control mb-2"
					type="password"
					placeholder="Password"
					value={password}
					onChange={(e) => setPassword(e.target.value)}
				/>

				<button className="btn btn-primary w-100" type="submit">
					Login
				</button>

				{error && <p className="text-danger mt-2">{error}</p>}
			</form>
		</div>
	);
}
