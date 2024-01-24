import { FormData, Ingredient, Recipe, UploadRecipe } from "./recipeService";
import supabase, { supabaseUrl } from "./supabase";

export async function fetchRecipes({ query }: { query: string }) {
  let { data, error } = await supabase
    .from("recipes")
    .select("*")
    .like(query !== "" ? "recipe_name" : "", `${query}%`);

  const recipes = data?.map((item: Recipe) => ({
    id: item.id,
    recipeImg: item.photo_url,
    name: item.recipe_name,
    time: item.preparation_time,
    portions: item.number_of_servings,
    calories: item.caloric_value,
    photoUrl: item.photo_url,
    ingredients: item.ingredients.split(";"),
  }));

  return recipes;
}

export async function getRecipeDetails({ id }: { id: number }) {
  let { data, error } = await supabase.from("recipes").select("*").eq("id", id);

  if (error) throw new Error(error.message);
  const item = data?.at(0);
  const recipe = {
    id: item.id,
    image: item.photo_url,
    title: item.recipe_name,
    minutes: item.preparation_time,
    persons: item.number_of_servings,
    kcals: item.caloric_value,
    nutritions: [
      { name: "Protein", value: item.protein },
      { name: "Carbs", value: item.carbohydrates },
      { name: "Fats", value: item.fats },
    ],
    ingredients: item.ingredients.split(";"),
    description: item.content_of_recipe,
  };
  return recipe;
}

export async function uploadRecipe(recipe: {
  ingredients: Ingredient[];
  recipeData: FormData;
}) {
  const { ingredients, recipeData } = recipe;
  const ingredientsString = ingredients
    .flatMap((el) => el.ingredient)
    .join(";");

  const { data, error } = await supabase
    .from("recipes")
    .insert([
      {
        recipe_name: recipeData.title,
        ingredients: ingredientsString,
        preparation_time: recipeData.prepTime,
        number_of_servings: recipeData.servings,
        caloric_value: recipeData.kcal,
        fats: recipeData.fats,
        protein: recipeData.protein,
        carbohydrates: recipeData.carbs,
        content_of_recipe: recipeData.recipe,
        photo_url: recipeData.image,
      },
    ])
    .select();

  if (error) throw new Error(error.message);

  return data;
}
