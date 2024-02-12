import { View, Text, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import SearchBar from "./components/SearchBar";
import RecipeItem from "./components/RecipeItem";
import { ScrollView } from "react-native-gesture-handler";
import { useQuery } from "react-query";
import { fetchRecipes } from "../../../services/recipeAPI";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import LoadingScreen from "../../../components/LoadingScreen";

export default function Recipes() {
  const [query, setQuery] = useState<string>("");

  const {
    data: recipes,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["recipes", query],
    queryFn: () => fetchRecipes({ query }),
  });

  if (isLoading) return <LoadingScreen />;

  if (recipes && recipes.length > 0) {
    return (
      <>
        <ScrollView className="h-full">
          <View className="mx-5 mt-4 h-full">
            <SearchBar
              handleClick={refetch}
              setQuery={setQuery}
              query={query}
            />
            {recipes &&
              recipes.map((item) => <RecipeItem recipe={item} key={item.id} />)}
          </View>
          <View className="mt-14 p-2"></View>
        </ScrollView>

        <View className="absolute right-10 top-[86%]">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/recipes/NewRecipe")}
          >
            <View className=" h-14 w-14 items-center justify-center rounded-full bg-orange-500  shadow-lg shadow-orange-500/40">
              <AntDesign name="plus" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  } else {
    return (
      <>
        <View className="mx-5 mt-4 h-full">
          <SearchBar setQuery={setQuery} query={query} handleClick={refetch} />
          <Text className="mx-5 mt-4 text-lg font-semibold text-red-600">
            Nie znaleziono przepisu zwierającego "{query}" w naziwe.
          </Text>
        </View>

        <View className="absolute right-10 top-[90%] flex h-full">
          <TouchableOpacity
            onPress={() => router.push("/(tabs)/recipes/NewRecipe")}
          >
            <View className=" h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/40">
              <AntDesign name="plus" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </>
    );
  }
}
