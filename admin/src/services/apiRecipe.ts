import { supabase } from "./supabase";

export async function getRecipes() {
  const { data: recipes, error } = await supabase.from("recipes").select("*");

  if (error) throw new Error(error.message);

  return recipes;
}

export async function deleteRecipe(id: string) {
  const { error } = await supabase.from("recipes").delete().eq("id", id);

  if (error) throw new Error(error.message);
}
