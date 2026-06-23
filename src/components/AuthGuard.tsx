import type { ReactNode } from "react";
import type { User } from "firebase/auth";
import { Navigate } from "react-router-dom";

type Props = {
	user: User | null;
	children: ReactNode;
	redirectTo: string;
	requireAuth?: boolean;
};

export default function AuthGuard({
	user,
	children,
	redirectTo,
	requireAuth = false,
}: Props) {
	// If route requires auth but user is NOT logged in:
	if (requireAuth && !user) {
		return <Navigate to={redirectTo} />;
	}

	// If route should be hidden from logged-in users:
	if (!requireAuth && user) {
		return <Navigate to={redirectTo} />;
	}

	return children;
}
