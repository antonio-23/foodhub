import { View } from 'react-native';
import React from 'react';

export default function Bubbles() {
  return (
    <View className="relative h-max w-max">
      <View className="absolute -bottom-44 -right-14 h-40 w-40 rounded-full bg-orange-300/25"></View>
      <View className="absolute -bottom-80 -right-10 h-96 w-96 translate-y-32 rounded-full bg-orange-300/50"></View>
      <View className="absolute -bottom-72 -left-36 h-80 w-80 translate-y-32 rounded-full bg-orange-400/75"></View>
    </View>
  );
}
