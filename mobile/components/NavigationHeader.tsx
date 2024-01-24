import { View, Text } from "react-native";
import React from "react";
import BackButton from "./BackButton";

export default function NavigationHeader({ label }: { label: string }) {
  return (
    <View>
      <View className="m-5 flex flex-row items-center">
        <View className="w-1/3">
          <BackButton />
        </View>
        <View className="w-1/3">
          <Text className="text-center text-base text-neutral-800">
            {label}
          </Text>
        </View>
      </View>
    </View>
  );
}
