import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addRecipe as addRecipeApi } from "../services/apiRecipe";
import toast from "react-hot-toast";

export function useAddRecipe() {
  const queryClient = useQueryClient();

  const { mutate: addRecipe, isLoading } = useMutation({
    mutationFn: addRecipeApi,
    onSuccess: () => {
      toast.success("Przepis został dodany");
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  return { addRecipe, isLoading };
}
