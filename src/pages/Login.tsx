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
		<div
			className="container d-flex justify-content-center align-items-center"
			style={{ minHeight: "80vh" }}
		>
			<div
				className="card shadow-lg border-0 p-5 d-flex justify-content-center"
				style={{ maxWidth: "500px", width: "100%", minHeight: "450px" }}
			>
				<h1 className="text-center mb-2">Welcome Back</h1>
				<p className="text-muted text-center mb-5">
					Sign in to manage your products and orders.
				</p>
				<form onSubmit={handleLogin}>
					<input
						className="form-control mb-3"
						type="email"
						placeholder="Email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
					<input
						className="form-control mb-3"
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
		</div>
	);
}
