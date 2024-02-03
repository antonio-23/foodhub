import { useQuery } from "react-query";
import { getMacros } from "../../../services/authAPI";

export function useMacros(id: string) {
  const { isLoading, data: macros } = useQuery({
    queryKey: ["macros", id],
    queryFn: () => getMacros(id),
  });

  return { isLoading, macros };
}
