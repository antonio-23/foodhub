import { View, Text } from "react-native";
import React from "react";
import CaloriesProgressBar from "../../../../components/CaloriesProgressBar";

interface props {
  color: string;
  text1: string;
  text2: string;
  name: string;
  progress: number;
}

export default function MacroItem({
  color,
  text1,
  text2,
  name,
  progress,
}: props) {
  return (
    <View>
      <CaloriesProgressBar progress={progress} color={color} />
      <View className="my-1 flex flex-row items-center">
        <Text className="text-sm text-white">{text1}</Text>
        <Text className="text-xs text-gray-300">{text2}</Text>
      </View>
      <Text className="text-sm font-light text-gray-300">{name}</Text>
    </View>
  );
}
