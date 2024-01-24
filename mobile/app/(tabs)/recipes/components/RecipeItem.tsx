import { View, Text, Image, TouchableOpacity } from "react-native";
import React from "react";
import {
  AntDesign,
  MaterialIcons,
  MaterialCommunityIcons,
} from "@expo/vector-icons";
import { router } from "expo-router";
import { useQueryClient } from "react-query";

interface Recipe {
  name: string;
  time: number;
  portions: number;
  calories: number;
  photoUrl: string;
  id: number;
}

export default function RecipeItem({ recipe }: { recipe: Recipe }) {
  const queryClient = useQueryClient();
  function handlePress() {
    queryClient.setQueryData(["currentRecipe"], recipe.id);
    router.push("/SingleRecipe");
  }

  return (
    <TouchableOpacity onPress={handlePress}>
      <View className="my-4 flex flex-row items-center justify-between">
        <View className="h-16 w-16 rounded-full">
          <Image
            style={{ flex: 1, borderRadius: 32 }}
            source={{ uri: recipe.photoUrl }}
          />
        </View>
        <View className="flex flex-col">
          <Text className="mb-2 w-52 text-lg">{recipe.name}</Text>
          <View className="flex flex-row gap-4 pr-10">
            <View className=" flex flex-row">
              <MaterialIcons name="timer" size={18} color="#6b7280" />
              <Text className="px-1 text-sm text-gray-500">{recipe.time}</Text>
            </View>
            <View className="flex flex-row">
              <MaterialCommunityIcons
                name="account-group-outline"
                size={18}
                color="#6b7280"
              />
              <Text className="px-1 text-sm text-gray-500">
                {recipe.portions}
              </Text>
            </View>
            <View className="flex flex-row">
              <MaterialCommunityIcons name="fire" size={18} color="#6b7280" />
              <Text className="px-1 text-sm text-gray-500">
                {recipe.calories} kcal
              </Text>
            </View>
          </View>
        </View>
        <AntDesign name="right" size={20} color="#6b7280" />
      </View>
    </TouchableOpacity>
  );
}
