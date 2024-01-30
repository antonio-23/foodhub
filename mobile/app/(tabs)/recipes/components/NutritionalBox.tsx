import React from "react";
import { Text, View } from "react-native";

export type NutritionalBoxType = {
  name: string;
  value: number;
};

export default function NutritionalBox({
  nutritions,
}: {
  nutritions: NutritionalBoxType[];
}) {
  return (
    <View className="flex-row justify-center gap-x-4 px-4 py-5">
      {nutritions.map((nutrition) => (
        <View
          key={nutrition.name}
          className="flex-1 rounded-2xl bg-orange-400 py-2 shadow-lg shadow-orange-500/40"
        >
          <Text className="text-center text-sm text-white">
            {nutrition.name}
          </Text>
          <Text className="text-center text-base font-medium text-white">
            {nutrition.value}g
          </Text>
        </View>
      ))}
    </View>
  );
}
