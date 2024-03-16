export interface User {
  email: string;
  password: string;
}

export interface UserUpdateForm {
  name?: string;
  email?: string;
  password?: string;
}

export type UserTable = {
  id: string;
  name: string;
  email: string;
  gender: string;
  height: number;
  actual_weight: number;
  weight_management_goal: string;
  physical_activity: string;
  weight_goal: number;
  birth_date: Date;
};

export type RecipeTable = {
  id: string;
  recipe_name: string;
  ingredients: string;
  content_of_recipe: string;
  preparation_time: number;
  number_of_servings: number;
  caloric_value: number;
  carbohydrates: number;
  fats: number;
  protein: number;
  photo_url: string;
};

export type Recipe = {
  recipe_name: string;
  ingredients: string;
  content_of_recipe: string;
  preparation_time: number;
  number_of_servings: number;
  caloric_value: number;
  carbohydrates: number;
  fats: number;
  protein: number;
};
