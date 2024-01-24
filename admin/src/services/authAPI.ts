import { supabase } from "./supabase";

export interface credentialsI {
  email: string;
  password: string;
}

export async function logIn(credentials: any) {
  if (!credentials.email || !credentials.password)
    throw new Error("Nie podano danych!");
  const { data, error } = await supabase.auth.signInWithPassword(credentials);

  if (error) throw new Error("Podano błędne dane");

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error("Błąd sesji");

  return data;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
  if (error) throw new Error(error.message);
}
export async function deleteUserFromAuth(id: any) {
  const { data, error } = await supabase.auth.admin.deleteUser(id);
  if (error) throw new Error(error.message);
  return data;
}
