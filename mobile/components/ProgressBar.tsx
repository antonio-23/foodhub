import { View } from 'react-native';
import React from 'react';
import * as Progress from 'react-native-progress';

export default function ProgressBar({ progress }: { progress: number }) {
  return (
    <View className="flex items-center py-6">
      <Progress.Bar
        progress={progress}
        width={256}
        height={14}
        borderRadius={20}
        unfilledColor="rgb(229, 231, 235)"
        color="rgb(242, 116, 35)"
      />
    </View>
  );
}
