import React, { ReactNode } from "react";
import { Navigate } from "react-router-dom";

interface ProtectRouterProps {
	children: ReactNode;
}

const ProtectRouter: React.FC<ProtectRouterProps> = ({ children }) => {
	const token = localStorage.getItem("token") ?? "";

	if (token.trim() === "") {
		return <Navigate to="/" replace />;
	}

	return <>{children}</>;
};

export default ProtectRouter;
