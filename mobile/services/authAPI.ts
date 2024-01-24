import { router } from "expo-router";
import supabase from "./supabase";
import { EditProfileFormData } from "./profileService";

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
  const { avatar, name, birthDate, password, userIdFromDb, updatedAt } =
    updatedData.updatedData;

  const data = {
    ...(name !== undefined && { name }),
    ...(birthDate !== undefined && { birthDate }),
    // ...(avatar !== undefined && { avatar }),
  };

  const newDataAuthUser = {
    ...(password !== undefined && { password }),
    data,
  };

  const newDataUserInformation = {
    ...(name !== undefined && { name }),
    ...(birthDate !== undefined && { birth_date: birthDate }),
    updated_at: updatedAt,
    // ...(avatar !== undefined && { data: { avatar } }),
  };

  const { data: dataAuthUser, error: errorAuthUser } =
    await supabase.auth.updateUser(newDataAuthUser);

  const { data: dataUserInformation, error: errorUserInformation } =
    await supabase
      .from("user_informations")
      .update(newDataUserInformation)
      .eq("user_id", userIdFromDb)
      .select();

  if (errorAuthUser) throw new Error(errorAuthUser.message);
  if (errorUserInformation) throw new Error(errorUserInformation.message);

  if (!avatar) {
    router.back();

    return { dataAuthUser, dataUserInformation };
  }
}
