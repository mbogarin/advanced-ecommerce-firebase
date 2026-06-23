import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth } from "../firebase/firebaseConfig";
import { db } from "../firebase/firebaseConfig";

export default function Register() {
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");

	const handleRegister = async (e: React.FormEvent) => {
		e.preventDefault();

		const userCredential = await createUserWithEmailAndPassword(
			auth,
			email,
			password,
		);

		const user = userCredential.user;

		// Firestore user document:
		await setDoc(doc(db, "users", user.uid), {
			uid: user.uid,
			email: user.email,
			createdAt: new Date(),
		});
		alert("User registered successfully");
	};

	return (
		<div className="container py-4">
			<h1 className="mb-4">Register</h1>

			{/* Form: */}
			<form onSubmit={handleRegister} className="w-50">
				<input
					className="form-control mb-2"
					type="email"
					placeholder="Email"
					value={email}
					onChange={(e) => setEmail(e.target.value)}
				/>

				<button className="btn btn-primary w-100" type="submit">
					Register
				</button>

				{error && <p className="text-danger mt-2">{error}</p>}
			</form>
		</div>
	);
}
