import supabase from "./supabase";

export interface UserInformations {
  name: string;
  weightManagementGoal: string;
  physicalActivity: string;
  gender: string;
  birthDate: string;
  height: number;
  actualWeight: number;
  weightGoal: number;
  userId: string | undefined;
  email: string;
}

export async function addUserInformation({
  name,
  weightManagementGoal,
  physicalActivity,
  gender,
  birthDate,
  height,
  actualWeight,
  weightGoal,
  userId,
  email,
}: UserInformations) {
  const { data, error } = await supabase.from("user_informations").insert([
    {
      name,
      weight_management_goal: weightManagementGoal,
      physical_activity: physicalActivity,
      gender,
      birth_date: birthDate,
      height,
      actual_weight: actualWeight,
      weight_goal: weightGoal,
      user_id: userId,
      email,
    },
  ]);

  if (error) throw new Error(error.message);

  return data;
}

export async function getUserMacros(userId: string) {
  const { data: dinnersData, error } = await supabase
    .from("dinners")
    .select("proteins, carbs, fats, kcal")
    .eq("userId", userId);

  if (error) {
    console.log(error.message);
    return;
  }

  const { data: breakfastsData, error: breakfastsError } = await supabase
    .from("breakfasts")
    .select("proteins, carbs, fats, kcal")
    .eq("userId", userId);
  if (breakfastsError) {
    console.log(breakfastsError.message);
    return;
  }

  const { data: suppersData, error: suppersError } = await supabase
    .from("suppers")
    .select("proteins, carbs, fats, kcal")
    .eq("userId", userId);
  if (suppersError) {
    console.log(suppersError.message);
    return;
  }

  const { data: snacksData, error: snacksError } = await supabase
    .from("snacks")
    .select("proteins, carbs, fats, kcal")
    .eq("userId", userId);
  if (snacksError) {
    console.log(snacksError.message);
    return;
  }

  const combinedData = [
    ...dinnersData,
    ...breakfastsData,
    ...suppersData,
    ...snacksData,
  ];

  return combinedData;
}
