import React from "react";
import { Text, View } from "react-native";

export default function IngredientsList({
  ingredients,
}: {
  ingredients: string[];
}) {
  return (
    <View className="mx-4">
      <Text className="mb-1 text-lg">Składniki</Text>
      {ingredients.map((ingredient) => (
        <Text key={ingredient} className="text-md ml-4">
          • {ingredient}
        </Text>
      ))}
    </View>
  );
}
