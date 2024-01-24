import { useQuery } from "react-query";
import { getCurrentUser } from "../services/authAPI";

export function useUser() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["activeUser"],
    queryFn: getCurrentUser,
  });

  return { isLoading, user };
}
