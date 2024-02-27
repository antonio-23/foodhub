import { useNavigate } from "react-router-dom";
import { useUser } from "../hooks/useUser";
import { useEffect } from "react";
import { FullPage } from "./styles";
import Spinner from "../components/Spinner";

export default function ProtectedRoute({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const { isLoading, isAuthenticated } = useUser();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      navigate("/login");
    }
  }, [isAuthenticated, isLoading, navigate]);

  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  if (isAuthenticated) return children;

  return <div>ProtectedRoute</div>;
}
