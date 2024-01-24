import { View, Text, TouchableOpacity } from "react-native";
import React, { ReactNode } from "react";
import { router } from "expo-router";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

interface CartProps {
  link: any;
  icon: ReactNode;
  text: string;
}

export default function Cart({ link, icon, text }: CartProps) {
  return (
    <View className="my-2">
      <TouchableOpacity
        onPress={() => router.push(link)}
        className=" mx-5 flex flex-row items-center justify-between border-b border-gray-300 pb-4"
      >
        <View className="flex flex-row items-center justify-center">
          <View className="mr-5">{icon}</View>
          <Text className="text-base">{text}</Text>
        </View>

        <View>
          <AntDesign name="right" size={24} color="black" />
        </View>
      </TouchableOpacity>
    </View>
  );
}
