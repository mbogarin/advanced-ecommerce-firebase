import { useEffect, useState } from "react";
import { auth, db } from "../firebase/firebaseConfig";
import { doc, getDoc, updateDoc } from "firebase/firestore";

export default function Profile() {
	const [userData, setUserData] = useState<any>(null);
	const [name, setName] = useState("");
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		const fetchUser = async () => {
			if (!auth.currentUser) return;

			const ref = doc(db, "users", auth.currentUser.uid);
			const snap = await getDoc(ref);

			if (snap.exists()) {
				setUserData(snap.data());
				setName(snap.data().name || "");
			}
		};

		fetchUser();
	}, []);

	const handleUpdate = async () => {
		if (!auth.currentUser) return;

		const ref = doc(db, "users", auth.currentUser.uid);

		setUserData((prev: any) => ({
			...prev,
			name: name,
		}));

		setEditMode(false);
	};

	if (!userData) return <div className="container py-4">Loading...</div>;

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
						className="btn btn-secondary"
						onClick={() => setEditMode(false)}
					>
						Cancel
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
