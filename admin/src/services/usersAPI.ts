import { supabase } from "./supabase";

export async function fetchAllUsers() {
  const { data, error } = await supabase.from("user_informations").select("*");

  if (error) throw new Error("Błąd podczas pobierania użytkowników!");
  return data;
}

export async function deleteUser(id: string) {
  const { error } = await supabase
    .from("user_informations")
    .delete()
    .eq("id", id);
  if (error) throw new Error("Nie udało się usunąć użytkownika");

  return true;
}
