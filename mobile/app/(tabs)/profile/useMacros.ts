import { useMutation, useQuery, useQueryClient } from "react-query";
import {
  getMacros,
  updateMacros as updateMacrosApi,
} from "../../../services/authAPI";

export function useMacros(id: string) {
  const { isLoading, data: macros } = useQuery({
    queryKey: ["macros", id],
    queryFn: () => getMacros(id),
  });

  return { isLoading, macros };
}

export function useUpdateMacros() {
  const queryClient = useQueryClient();

  const { mutate: updateMacros } = useMutation({
    mutationFn: updateMacrosApi,
    onSuccess: () => {
      queryClient.invalidateQueries("macros");
      queryClient.refetchQueries({ queryKey: ["macros"] });
    },
    onError: (error) => {
      console.error(error);
    },
  });

  return { updateMacros };
}
