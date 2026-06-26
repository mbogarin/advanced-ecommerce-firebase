import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc, setDoc } from "firebase/firestore";
import { deleteUser, type User } from "firebase/auth";

// type:
type ProfileUserData = {
	email?: string | null;
	name?: string;
	address?: string;
};

export default function Profile({ user }: { user: User | null }) {
	// States:
	const [userData, setUserData] = useState<ProfileUserData | null>(null);
	const [name, setName] = useState("");
	const [address, setAddress] = useState("");
	const [editMode, setEditMode] = useState(false);
	const [error, setError] = useState("");
	const [success, setSuccess] = useState("");
	const navigate = useNavigate();

	useEffect(() => {
		if (!user) return;

		// Fetch user:
		const fetchUser = async () => {
			// console.log("fetchUser running for:", user?.uid);

			const ref = doc(db, "users", user.uid);
			const snap = await getDoc(ref);

			if (snap.exists()) {
				// Exisiting user load:
				const data = snap.data() as ProfileUserData;

				setUserData(data);
				setName(data.name || "");
				setAddress(data.address || "");
			} else {
				// New user creation:
				const newUserData = {
					email: user.email,
					name: "",
					address: "",
				};

				await setDoc(doc(db, "users", user.uid), newUserData);

				setUserData(newUserData);
				setName("");
				setAddress("");
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
			await setDoc(ref, { name, address }, { merge: true });

			setUserData((prev) => {
				if (!prev) return { name, address, email: userData?.email };
				return {
					...prev,
					name,
					address,
				};
			});

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
			await deleteUser(auth.currentUser);
			await deleteDoc(doc(db, "users", uid));
			// alert("Account successfully deleted");
			await auth.signOut();
			navigate("/login");
		} catch (err) {
			console.error(err);
			alert("Account deletion failed. Please log in and try again.");
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
					<strong>Email:</strong> {user?.email}
				</p>

				<hr className="my-3" />

				<p className="mb-2">
					<strong>Name: </strong>
					<span className="text-muted">
						{userData.name || "No name set"}
					</span>
				</p>

				<p className="mb-3">
					<strong>Address: </strong>
					<span className="text-muted">
						{userData.address || "No address set"}
					</span>
				</p>

				{editMode ? (
					<div>
						<input
							className="form-control mb-3"
							value={name}
							onChange={(e) => setName(e.target.value)}
							placeholder="Enter name"
						/>

						<input
							className="form-control mb-3"
							value={address}
							onChange={(e) => setAddress(e.target.value)}
							placeholder="Enter address"
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
								onClick={() => {
									setEditMode(false);
									setSuccess("");
									setError("");
								}}
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
