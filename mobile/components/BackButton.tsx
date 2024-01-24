import { View } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import { router } from "expo-router";
import { AntDesign } from "@expo/vector-icons";

export default function BackButton() {
  return (
    <View>
      <TouchableOpacity onPress={() => router.back()}>
        <View className="flex h-10 w-10 items-center justify-center rounded-xl bg-white shadow-md">
          <AntDesign name="left" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
