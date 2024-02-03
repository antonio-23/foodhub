import { router } from "expo-router";
import supabase from "./supabase";
import { EditMacrosFormData, EditProfileFormData } from "./profileService";

export interface AuthCredentials {
  avatar?: string;
  email: string;
  password: string;
  name?: string;
  birthDate?: Date;
  gender?: string;
  weightManagementGoal?: string;
  physicalActivity?: string;
  height?: number;
  actualWeight?: number;
  weightGoal?: number;
}

export async function emailCheck(email: string): Promise<boolean> {
  const { data, error } = await supabase
    .from("user_informations")
    .select("email")
    .eq("email", email);

  if (error) throw new Error(error.message);

  return data.length > 0;
}

export async function signUp({
  email,
  password,
  name,
  birthDate,
  weightManagementGoal,
  physicalActivity,
  gender,
  height,
  actualWeight,
  weightGoal,
}: AuthCredentials): Promise<any> {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
        birthDate,
        weightManagementGoal,
        physicalActivity,
        gender,
        height,
        actualWeight,
        weightGoal,
      },
    },
  });
  if (error) throw new Error(error.message);
  return data;
}

export async function logIn({ email, password }: AuthCredentials) {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw new Error(error.message);
  return data;
}

export async function resetPassword(email: string) {
  let { data, error } = await supabase.auth.resetPasswordForEmail(email);

  if (error) throw new Error(error.message);

  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);
  if (data?.user) {
    router.push("/(tabs)/home/Home");
  }
}

export async function getLoggedUserId() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  const { data, error } = await supabase.auth.getUser();
  if (error) throw new Error(error.message);
  return data.user.id;
}

export async function getUserDetails() {
  const { data: session } = await supabase.auth.getSession();

  if (!session.session) return null;

  const { data, error } = await supabase.auth.getUser();

  if (error) throw new Error(error.message);

  return data?.user;
}

export async function logOut() {
  const { error } = await supabase.auth.signOut();
}

export async function updateCurrentUser(updatedData: {
  updatedData: EditProfileFormData;
}) {
  const { avatar, name, birthDate, password } = updatedData.updatedData;

  const data = {
    ...(name !== undefined && { name }),
    ...(birthDate !== undefined && { birthDate }),
    // ...(avatar !== undefined && { avatar }),
  };

  const newDataAuthUser = {
    ...(password !== undefined && { password }),
    data,
  };

  try {
    const { data: dataAuthUser, error: errorAuthUser } =
      await supabase.auth.updateUser(newDataAuthUser);

    if (errorAuthUser) throw new Error(errorAuthUser.message);

    if (!avatar) {
      router.back();

      return { dataAuthUser };
    }
  } catch (error) {
    console.error("An error occurred:", error);
    throw error;
  }
}

export async function getMacros(id: string) {
  let { data, error } = await supabase
    .from("user_informations")
    .select("macros")
    .eq("user_id", id);

  if (error) throw new Error(error.message);

  return data;
}

export async function updateMacros(updatedData: EditMacrosFormData) {
  const { carbs, fat, kcal, protein, id } = updatedData;
  const formData = { carbs, fat, kcal, protein };

  const { data, error } = await supabase
    .from("user_informations")
    .update({ macros: formData })
    .eq("user_id", id)
    .select();

  if (error) throw new Error(error.message);
  return data;
}
