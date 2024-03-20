import { useQuery } from "@tanstack/react-query";
import { getRecipes } from "../services/apiRecipe";

export function useRecipe() {
  const { data, isLoading } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });

  return { data, isLoading };
}
