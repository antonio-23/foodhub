export interface Ingredient {
  id: number;
  ingredient: string;
  quantity: number;
  unit: string;
}

export interface FormData {
  image: string;
  ingredient: string;
  quantity: number;
  unit: string;
  title: string;
  recipe: string;
  prepTime: number;
  servings: number;
  kcal: number;
  protein: number;
  fats: number;
  carbs: number;
}

export interface UploadRecipe {
  title: string;
  ingName: string;
  quantity: string;
  type: string;
  prepTime: number;
  servings: number;
  kcal: string;
  protein: number;
  fats: number;
  carbs: number;
  recipe: string;
  ingredients: Ingredient[];
}

export interface Recipe {
  id: number;
  recipe_name: string;
  caloric_value: number;
  carbohydrates: number;
  protein: number;
  fats: number;
  preparation_time: number;
  number_of_servings: number;
  content_of_recipe: string;
  photo_url: string;
  ingredients: string;
}
