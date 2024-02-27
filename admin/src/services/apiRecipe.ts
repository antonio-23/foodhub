import { supabase } from "./supabase";

export async function getRecipes() {
  const { data: recipes, error } = await supabase.from("recipes").select("*");

  if (error) throw new Error(error.message);

  return recipes;
}
