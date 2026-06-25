import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { deleteUser, type User } from "firebase/auth";

type ProfileUserData = {
	email?: string | null;
	name?: string;
};

export default function Profile({ user }: { user: User | null }) {
	console.log("PROFILE RENDER user:", user);

	const [userData, setUserData] = useState<ProfileUserData | null>(null);
	const [name, setName] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");

	console.log("PROFILE userData:", userData);

	useEffect(() => {
		console.log("useEffect fired");
		if (!user) return;

		const fetchUser = async () => {
			console.log("fetchUser running for:", user?.uid);

			const ref = doc(db, "users", user.uid);
			const snap = await getDoc(ref);

			if (snap.exists()) {
				setUserData(snap.data());
				setName(snap.data().name || "");
			} else {
				setUserData({
					email: user.email,
					name: "",
				});
				setName("");
			}
		};

		fetchUser();
	}, [user]);

	// UPDATE:
	const handleUpdate = async () => {
		if (!auth.currentUser) return;

		setError("");
		setSuccess("");

		try {
			const ref = doc(db, "users", auth.currentUser.uid);
			await setDoc(ref, { name }, { merge: true });

			setUserData((prev) => ({
				...(prev ?? {}),
				name,
			}));

			setSuccess("Profile updated successfully");
			setEditMode(false);
		} catch (error: unknown) {
			console.error("Update failed:", error);

			if (error instanceof Error && error.message) {
				setError(error.message);
			} else {
				setError("Failed to update profile. Please try again.");
			}
		}
	};

	// DELETE:
	const handleDeleteAccount = async () => {
		if (!auth.currentUser) return;

		const uid = auth.currentUser.uid;

		if (
			!window.confirm(
				"Are you sure you want to delete your account? This action cannot be undone.",
			)
		) {
			return;
		}

		try {
			// 1. delete firestore user doc:
			await deleteDoc(doc(db, "users", uid));

			// 2. delete auth user:
			await deleteUser(auth.currentUser);
			alert("Account successfully deleted");
			console.log("Account deleted");
		} catch (error) {
			console.error("Delete failed:", error);
		}
	};

	if (!user) return <div className="container py-4">Please log in...</div>;
	if (!userData)
		return <div className="container py-4">Loading profile...</div>;

	return (
		<div
			className="container d-flex justify-content-center align-items-center"
			style={{ minHeight: "80vh" }}
		>
			<div
				className="card shadow-sm border-0 p-4 w-100"
				style={{ maxWidth: "500px" }}
			>
				{/* Avatar placeholder */}
				<div className="text-center mb-3">
					<div
						style={{
							width: "70px",
							height: "70px",
							borderRadius: "50%",
							backgroundColor: "#f1f1f1",
							display: "flex",
							alignItems: "center",
							justifyContent: "center",
							fontSize: "24px",
							margin: "0 auto",
						}}
					>
						👤
					</div>
				</div>

				<h1 className="text-center mb-4">Profile</h1>

				{error && (
					<div className="alert alert-danger py-2 text-center">
						{error}
					</div>
				)}

				{success && (
					<div className="alert alert-success py-2 text-center">
						{success}
					</div>
				)}

				<p className="mb-2">
					<strong>Email:</strong> {userData.email}
				</p>

				<hr className="my-3" />

				<div className="mb-2">
					<strong>Name:</strong>
				</div>

				{editMode ? (
					<div>
						<input
							className="form-control mb-3"
							value={name}
							onChange={(e) => setName(e.target.value)}
						/>

						<div className="d-flex gap-2 flex-wrap">
							<button
								className="btn btn-success"
								onClick={handleUpdate}
							>
								Save
							</button>

							<button
								className="btn btn-outline-secondary"
								onClick={() => setEditMode(false)}
							>
								Cancel
							</button>

							<button
								className="btn btn-danger ms-auto"
								onClick={handleDeleteAccount}
							>
								Delete Account
							</button>
						</div>
					</div>
				) : (
					<div>
						<p className="mb-3 text-muted">
							{userData.name || "No name set"}
						</p>

						<button
							className="btn btn-primary w-100"
							onClick={() => setEditMode(true)}
						>
							Edit Profile
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
