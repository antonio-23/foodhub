import { useQuery } from "@tanstack/react-query";
import { allUsers } from "../services/apiAuth";

export function useAllUsers() {
  const { data, isLoading } = useQuery({
    queryKey: ["allUsers"],
    queryFn: allUsers,
  });

  return { data, isLoading };
}
