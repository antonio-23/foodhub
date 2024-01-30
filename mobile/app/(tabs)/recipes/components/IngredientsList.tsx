import React from "react";
import { Text, View } from "react-native";

export default function IngredientsList({
  ingredients,
}: {
  ingredients: string[];
}) {
  return (
    <View className="mx-5">
      <Text className="text-xl font-medium">Składniki</Text>
      {ingredients.map((ingredient) => (
        <Text key={ingredient} className="ml-4 text-base">
          • {ingredient}
        </Text>
      ))}
    </View>
  );
}
