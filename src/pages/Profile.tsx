import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, deleteDoc } from "firebase/firestore";
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
			}
		};

		fetchUser();
	}, [user]);

	// UPDATE:
	const handleUpdate = async () => {
		if (!auth.currentUser) return;

		setUserData((prev) => ({
			...(prev ?? {}),
			name,
		}));

		setEditMode(false);
	};

	// DELETE:
	const handleDeleteAccount = async () => {
		if (!auth.currentUser) return;

		const uid = auth.currentUser.uid;

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
		<div className="container py-4">
			<h1 className="mb-4">Profile</h1>

			<p>
				<strong>Email:</strong> {userData.email}
			</p>

			<p>
				<strong>Name:</strong>
			</p>

			{editMode ? (
				<div>
					<input
						className="form-control mb-2"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>

					<button
						className="btn btn-success me-2"
						onClick={handleUpdate}
					>
						Save
					</button>

					<button
						className="btn btn-secondary me-5"
						onClick={() => setEditMode(false)}
					>
						Cancel
					</button>

					{/* 3. Delete Account: */}
					<button
						className="btn btn-danger"
						onClick={handleDeleteAccount}
					>
						Delete Account
					</button>
				</div>
			) : (
				<div>
					<p>{userData.name}</p>

					<button
						className="btn btn-primary"
						onClick={() => setEditMode(true)}
					>
						Edit Profile
					</button>
				</div>
			)}
		</div>
	);
}
