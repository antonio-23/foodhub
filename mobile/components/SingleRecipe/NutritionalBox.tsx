import React from "react";
import { LinearGradient } from "expo-linear-gradient";
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
    <View className="flex-row justify-around gap-x-4 px-4 py-5">
      {nutritions.map((nutrition, index) => (
        <LinearGradient
          key={`${nutrition.name}-${index}`}
          colors={["#EE6113FF", "#EE6113BB"]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          className="flex-1 rounded-lg px-4 py-2"
        >
          <Text className="text-center text-xs text-white">
            {nutrition.name}
          </Text>
          <Text className="text-center text-white">{nutrition.value}g</Text>
        </LinearGradient>
      ))}
    </View>
  );
}
