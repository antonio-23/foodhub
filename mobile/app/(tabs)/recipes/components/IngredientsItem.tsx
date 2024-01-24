import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { AntDesign } from "@expo/vector-icons";

export default function IngredientsItem({
  name,
  quantity,
  unit,
  onDelete,
}: {
  name: string;
  quantity: number;
  unit: string;
  onDelete: () => void;
}) {
  return (
    <View className="my-1 flex flex-row items-center justify-between border-b border-gray-400 px-1 pb-[2px]">
      <Text className=" text-base ">{name}</Text>
      <View className="flex flex-row items-center gap-7">
        <Text className="text-base text-gray-600">
          {quantity} {unit}
        </Text>

        <TouchableOpacity onPress={onDelete}>
          <AntDesign name="close" size={22} color="black" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
