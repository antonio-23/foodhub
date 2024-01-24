import { supabase } from "./supabase";

export async function fetchRecipes() {
  const { data, error } = await supabase.from("recipes").select("*");
  if (error) throw new Error("Błąd podczas pobierania przepisów.");
  console.log(data);
  return data;
}
