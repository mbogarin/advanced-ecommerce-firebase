import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error] = useState("");
	const [name, setName] = useState("");

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		try {
			console.log("email:", email);
			console.log("password:", password);

			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password,
			);

			const user = userCredential.user;
			console.log("AUTH USER CREATED:", user.uid);

			// Firestore user document:
			await setDoc(doc(db, "users", user.uid), {
				uid: user.uid,
				email: user.email,
				name: name,
				createdAt: new Date().toISOString(),
			});

			console.log("FIRESTORE USER CREATED");

			alert("User registered successfully");
		} catch (error) {
			console.error("REGISTER ERROR:", error);
		}
	};

	return (
		<div
			className="container d-flex justify-content-center align-items-center"
			style={{ minHeight: "80vh" }}
		>
			<div
				className="card shadow-lg border-0 p-4"
				style={{ maxWidth: "500px", width: "100%" }}
			>
				<h1 className="text-center mb-2">Create Account</h1>
				<p className="text-muted text-center mb-5">
					Sign up to start shopping and manage your orders.
				</p>

				<form onSubmit={handleRegister}>
					<input
						className="form-control mb-3"
						type="text"
						placeholder="Name"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

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
						Register
					</button>

					{error && <p className="text-danger mt-2">{error}</p>}
				</form>
			</div>
		</div>
	);
}
