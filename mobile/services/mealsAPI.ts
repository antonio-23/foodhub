import { convertDateToSupabaseFormat } from "../utils/toSupabaseDateConverter";
import supabase from "./supabase";

export async function addMeal(meal: { dataOfMeal: {}; mealType: string }) {
  const { dataOfMeal, mealType } = meal;

  const { data, error } = await supabase
    .from(mealType)
    .insert([{ ...dataOfMeal }])
    .select();

  if (error) throw new Error(error.message);

  return data;
}

export async function fetchSingleMeal({
  mealType,
  userId,
}: {
  mealType: string;
  userId: string;
}) {
  let today = convertDateToSupabaseFormat(new Date());

  let { data, error } = await supabase
    .from(mealType)
    .select("*")
    .eq("userId", userId)
    .eq("date", today);

  if (error) {
    console.error(error);
    throw new Error("Meals could not be loaded");
  }

  return data;
}

export async function getAllMeals({ userId }: { userId: any }) {
  let today = convertDateToSupabaseFormat(new Date());

  let { data: breakfasts, error } = await supabase
    .from("breakfasts")
    .select("*")
    .eq("userId", userId)
    .eq("date", today);

  if (error) throw new Error(error.message);

  let { data: dinners, error: error2 } = await supabase
    .from("dinners")
    .select("*")
    .eq("userId", userId)
    .eq("date", today);

  if (error2) throw new Error(error2.message);

  let { data: snacks, error: error3 } = await supabase
    .from("snacks")
    .select("*")
    .eq("userId", userId)
    .eq("date", today);

  if (error3) throw new Error(error3.message);

  let { data: suppers, error: error4 } = await supabase
    .from("suppers")
    .select("*")
    .eq("userId", userId)
    .eq("date", today);

  if (error4) throw new Error(error4.message);

  return {
    breakfasts,
    dinners,
    snacks,
    suppers,
  };
}

export async function deleteMeal({
  id,
  mealType,
}: {
  id: number;
  mealType: string;
}) {
  const { data, error } = await supabase.from(mealType).delete().eq("id", id);

  if (error) {
    console.error(error);
    throw new Error("Meal could not be deleted");
  }

  return data;
}
