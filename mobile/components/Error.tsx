import { Text } from "react-native";
import React, { ReactNode } from "react";

export default function Error({ children }: { children: ReactNode }) {
  return <Text className="pb-2 font-bold text-red-600">{children}</Text>;
}
