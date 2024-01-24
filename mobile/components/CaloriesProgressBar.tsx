import React from "react";
import * as Progress from "react-native-progress";

export default function CaloriesProgressBar({
  progress,
  color,
}: {
  progress: number;
  color: string;
}) {
  return (
    <Progress.Bar
      progress={progress}
      width={64}
      height={4}
      borderRadius={20}
      unfilledColor="rgb(229, 231, 235)"
      color={color}
    />
  );
}
