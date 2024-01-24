import React, { useEffect } from "react";
import {
  View,
  Text,
  ImageBackground,
  ScrollView,
  StyleSheet,
} from "react-native";
import { Stack } from "expo-router";
import { Entypo } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import BackButton from "../components/BackButton";
import IngredientsList from "../components/SingleRecipe/IngredientsList";
import NutritionalBox from "../components/SingleRecipe/NutritionalBox";
import { useQuery, useQueryClient } from "react-query";
import { getRecipeDetails } from "../services/recipeAPI";
import LoadingScreen from "../components/LoadingScreen";

export default function SingleRecipeView() {
  const queryClient = useQueryClient();
  const id: number = Number(queryClient.getQueryData("currentRecipe"));
  const { data: recipe, isLoading } = useQuery({
    queryKey: ["recipeDetails"],
    queryFn: async () => {
      if (id) {
        return await getRecipeDetails({ id });
      } else throw new Error("Nie znaleziono przepisu");
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(["recipeDetails"]);
  }, []);

  if (isLoading) return <LoadingScreen />;
  if (recipe)
    return (
      <View className="flex-1 bg-white">
        <ScrollView className="flex-1">
          <Stack.Screen options={{ headerShown: false }} />
          <View className="h-[30vh] ">
            <ImageBackground
              source={{ uri: recipe?.image }}
              className="h-full w-full"
            >
              <View style={styles.overlay} />
            </ImageBackground>
          </View>

          <View className="relative bg-white">
            <View className="absolute -top-4 z-50 w-full rounded-2xl bg-white pt-8"></View>
            <View className="mx-4 -mb-2 mt-4">
              <Text className="text-2xl">{recipe?.title}</Text>
              <View className="my-3 flex flex-row items-center gap-x-2">
                <View className="mr-2 flex flex-row justify-center">
                  <Entypo name="stopwatch" size={18} color="#9CA3AF" />
                  <Text className="ml-1 font-semibold text-gray-400">
                    {recipe.minutes} min
                  </Text>
                </View>
                <View className="mr-2 flex flex-row justify-center">
                  <MaterialCommunityIcons
                    name="account-group-outline"
                    size={18}
                    color="#9CA3AF"
                  />
                  <Text className="ml-1 font-semibold text-gray-400">
                    {recipe.persons}
                  </Text>
                </View>
                <View className="mr-2 flex flex-row justify-center ">
                  <MaterialCommunityIcons
                    name="fire"
                    size={18}
                    color="#9CA3AF"
                  />
                  <Text className="ml-1 font-semibold text-gray-400">
                    {recipe.kcals} kcal
                  </Text>
                </View>
              </View>
            </View>

            <NutritionalBox nutritions={recipe.nutritions} />

            <IngredientsList ingredients={recipe.ingredients} />

            <View className="mx-4 pb-6">
              <Text className="mb-1 mt-2 text-lg">Przepis</Text>
              <Text className="ml-4">{recipe.description}</Text>
            </View>
          </View>
        </ScrollView>

        <View className="absolute left-4 top-8 z-50 mt-7">
          <BackButton />
        </View>
      </View>
    );
}

const styles = StyleSheet.create({
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(39,39,42,0.25)",
  },
});
