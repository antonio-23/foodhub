import { User, UserUpdateForm } from "../types/types";
import { supabase } from "./supabase";

export async function login({ email, password }: User) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);

  return data;
}

export async function logout() {
  const { error } = await supabase.auth.signOut();

  if (error) throw new Error(error.message);
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();

  if (!session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function updateCurrentUser({ password, name }: UserUpdateForm) {
  let updateData = {};
  if (password) updateData = { password };
  if (name) updateData = { data: { name } };

  const { data, error } = await supabase.auth.updateUser(updateData);

  if (error) throw new Error(error.message);

  return data;
}

export async function allUsers() {
  const { data, error } = await supabase.from("user_informations").select("*");
  if (error) throw new Error(error.message);

  return data;
}

export async function deleteUser(id: string) {
  const { data } = await supabase
    .from("user_informations")
    .select("user_id")
    .eq("id", id);

  const { error } = await supabase.auth.admin.deleteUser(data?.at(0)?.user_id);

  if (error) throw new Error(error.message);
}

export async function numberOfUsers() {
  const { data, error } = await supabase
    .from("user_informations")
    .select("id", { count: "exact" });

  if (error) throw new Error(error.message);

  return data?.length;
}

export async function gender() {
  const { data, error } = await supabase
    .from("user_informations")
    .select("gender");

  if (error) throw new Error(error.message);

  let maleCount = 0;
  let femaleCount = 0;

  data?.forEach((user: any) => {
    if (user.gender === "MALE") maleCount++;
    if (user.gender === "FEMALE") femaleCount++;
  });

  const genderData = [
    { name: "Kobiety", value: femaleCount, color: "#eab308" },
    { name: "Mężczyźni", value: maleCount, color: "#22c55e" },
  ];

  return genderData;
}
