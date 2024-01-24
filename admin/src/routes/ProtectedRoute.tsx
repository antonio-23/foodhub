import React from "react";
import { useUser } from "../hooks/useUser";
import FullScreenSpinner from "../components/FullScreenSpinner";
import { useNavigate } from "react-router-dom";

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const { user, isLoading } = useUser();
  if (!user) {
    navigate("/login");
  }
  if (isLoading) return <FullScreenSpinner />;
  return children;
}

export default ProtectedRoute;
