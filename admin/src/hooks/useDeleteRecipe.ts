import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteRecipe as deleteRecipeApi } from "../services/apiRecipe";
import toast from "react-hot-toast";

export function useDeleteRecipe() {
  const queryClient = useQueryClient();

  const { mutate: deleteRecipe, isLoading: isDeleting } = useMutation({
    mutationFn: deleteRecipeApi,
    onSuccess: () => {
      toast.success("Przepis został usunięty");
      queryClient.invalidateQueries({
        queryKey: ["recipes"],
      });
    },
  });

  return { deleteRecipe, isDeleting };
}
