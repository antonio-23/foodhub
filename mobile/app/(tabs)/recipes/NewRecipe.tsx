import { ScrollView, Text, TouchableOpacity, View, Image } from "react-native";
import { useState } from "react";
import { ImagePickerAsset } from "expo-image-picker";
import { useMutation, useQueryClient } from "react-query";
import { uploadRecipe } from "../../../services/recipeAPI";
import { router } from "expo-router";
import NavigationHeader from "../../../components/NavigationHeader";
import Input from "../../../components/Input";
import IngredientsItem from "./components/IngredientsItem";
import { pickImage } from "../../../utils/pickImage";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Error from "../../../components/Error";
import { FormData, Ingredient } from "../../../services/recipeService";
import { uploadImageToSupabase } from "../../../utils/uploadImageToStorage";
import Spinner from "../../../components/Spinner";

export default function NewRecipe() {
  const [image, setImage] = useState<ImagePickerAsset | null>(null);
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);

  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation({
    mutationFn: uploadRecipe,
    onSuccess: () => {
      setImage(null);
      queryClient.refetchQueries(["recipes"]);
      router.push("/(tabs)/recipes/Recipes");
    },
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();

  const onAddIngredient: SubmitHandler<FormData> = (newIngredient) => {
    const { ingredient, quantity, unit } = newIngredient;
    const id = Math.floor(Math.random() * 1000);

    setIngredients((prevIngredient) => [
      ...prevIngredient,
      { ingredient, quantity, unit, id },
    ]);

    /**
     * @todo Zrobić czyszczenie formularza po dodaniu składnika
     */
  };

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { title, recipe, prepTime, servings, kcal, protein, fats, carbs } =
      data;

    // Najpierw trzeba dodać zdjęcie do supabase-storage, nastepnie utworzyć url i ten url zapisać w bazie

    const imageUrl =
      image !== null
        ? await uploadImageToSupabase(image, title)
        : "https://img.freepik.com/premium-zdjecie/makieta-widoku-z-gory-pustego-talerza_863013-119193.jpg";

    const newRecipe = {
      ingredients,
      recipeData: {
        image: imageUrl,
        title,
        recipe,
        prepTime,
        servings,
        kcal,
        protein,
        fats,
        carbs,
      },
    };

    /**
     * @error Funkcja działa natomiast jest jakiś błąd z przekazaniem typów w TS
     */
    // @ts-ignore
    mutate(newRecipe);
  };

  const deleteIngredient = (idToDelete: number) => {
    const updatedIngredients = ingredients.filter(
      (item) => item.id !== idToDelete,
    );
    setIngredients(updatedIngredients);
  };

  return (
    <View className="flex flex-1">
      <NavigationHeader label="Dodaj przepis" />

      <ScrollView>
        <View className="mx-5">
          <View className="mb-5 flex h-40 flex-1 items-center justify-center rounded-2xl border border-gray-300 bg-white">
            <TouchableOpacity
              className="absolute z-10 rounded-xl bg-white/60 p-2"
              onPress={() => pickImage(setImage)}
            >
              <View>
                <Text className="text-lg">Dodaj zdjęcie</Text>
              </View>
            </TouchableOpacity>

            {image && (
              <Image
                source={{ uri: image.uri }}
                style={{
                  flex: 1,
                  width: "100%",
                  height: "100%",
                  resizeMode: "cover",
                  borderRadius: 16,
                }}
              />
            )}
          </View>

          <View>
            <Controller
              name="ingredient"
              control={control}
              rules={{ required: "Podanie składnika jest wymagane." }}
              render={({ field }) => (
                <Input
                  label="Składnik"
                  placeholder="Składnik"
                  action={(value) => field.onChange(value)}
                  inputMode="text"
                />
              )}
            />
            {errors.ingredient && <Error>{errors.ingredient.message}</Error>}

            <Controller
              name="quantity"
              control={control}
              rules={{
                required: "Podanie ilości jest wymagane.",
                pattern: {
                  value: /^[0-9]+$/,
                  message: "Wprowadź poprawną liczbę.",
                },
              }}
              render={({ field }) => (
                <Input
                  label="Ilość"
                  placeholder="Ilość"
                  inputMode="numeric"
                  action={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.quantity && <Error>{errors.quantity.message}</Error>}

            <Controller
              name="unit"
              control={control}
              rules={{ required: "Podanie miary jest wymagane." }}
              render={({ field }) => (
                <Input
                  label="Miara"
                  placeholder="Miara"
                  autoCapitalize="none"
                  inputMode="text"
                  action={(value) => field.onChange(value)}
                />
              )}
            />
            {errors.unit && <Error>{errors.unit.message}</Error>}

            <View className="flex items-center justify-center">
              <TouchableOpacity
                onPress={handleSubmit(onAddIngredient)}
                className={`w-6/12 rounded-3xl ${
                  isLoading ? "bg-orange-400/70" : "bg-orange-400"
                }  py-3 shadow-lg`}
                disabled={isLoading}
              >
                <Text className="text-center text-lg text-white">
                  Dodaj składnik
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {ingredients.length > 0 && (
            <>
              <View className="my-10">
                {ingredients.map((ing) => (
                  <IngredientsItem
                    key={ing.id}
                    name={ing.ingredient}
                    quantity={ing.quantity}
                    unit={ing.unit}
                    onDelete={() => deleteIngredient(ing.id)}
                  />
                ))}
              </View>

              <View>
                <Controller
                  name="title"
                  control={control}
                  render={({ field }) => (
                    <Input
                      label="Nazwa przepisu"
                      placeholder="Nazwa przepisu"
                      inputMode="text"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.title && <Error>{errors.title.message}</Error>}

                <Controller
                  name="recipe"
                  control={control}
                  render={({ field }) => (
                    <Input
                      multiline={true}
                      label="Przepis"
                      placeholder="Wprowadź przepis"
                      inputMode="text"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.recipe && <Error>{errors.recipe.message}</Error>}

                <Controller
                  name="prepTime"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Czas przygotowania"
                      placeholder="Czas przygotowania [min]"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.prepTime && <Error>{errors.prepTime.message}</Error>}

                <Controller
                  name="servings"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Liczba porcji"
                      placeholder="Liczba porcji"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.servings && <Error>{errors.servings.message}</Error>}

                <Controller
                  name="kcal"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Liczba kcal"
                      placeholder="Liczba kcal"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.kcal && <Error>{errors.kcal.message}</Error>}

                <Controller
                  name="protein"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Liczba białka"
                      placeholder="Liczba białka"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.protein && <Error>{errors.protein.message}</Error>}

                <Controller
                  name="fats"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Liczba tłuszczów"
                      placeholder="Liczba tłuszczów"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.fats && <Error>{errors.fats.message}</Error>}

                <Controller
                  name="carbs"
                  control={control}
                  rules={{
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę.",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Liczba węglowodanów"
                      placeholder="Liczba węglowodanów"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.carbs && <Error>{errors.carbs.message}</Error>}
              </View>

              <View className="mb-10 flex items-center justify-center">
                <TouchableOpacity
                  onPress={handleSubmit(onSubmit)}
                  className={`w-6/12 rounded-3xl ${
                    isLoading ? "bg-orange-400/70" : "bg-orange-400"
                  }  py-3 shadow-lg`}
                  disabled={isLoading}
                >
                  <Text className="text-center text-lg text-white">
                    Dodaj przepis
                  </Text>
                </TouchableOpacity>
              </View>
            </>
          )}
          <Image
            source={{ uri: "data:image/jpeg;base64," + image }}
            style={{ width: 200, height: 200 }}
          />
        </View>
      </ScrollView>

      {isLoading && (
        <View className="absolute left-[50%] right-[50%] top-[50%]">
          <Spinner />
        </View>
      )}
    </View>
  );
}
