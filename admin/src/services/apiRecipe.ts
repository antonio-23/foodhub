import { Recipe } from "../types/types";
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

export async function addRecipe(recipe: Recipe) {
  const { data, error } = await supabase
    .from("recipes")
    .insert(recipe)
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function numberOfRecipes() {
  const { data, error } = await supabase
    .from("recipes")
    .select("id", { count: "exact" });

  if (error) throw new Error(error.message);

  return data?.length;
}
