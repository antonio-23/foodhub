import { useQuery } from "react-query";
import { getUserDetails } from "../../../services/authAPI";

export function useProfile() {
  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn: getUserDetails,
  });

  return { isLoading, user };
}
