import { View, Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import ProgressBar from "../components/ProgressBar";
import { useRegisterStore } from "../store/register/registerStore";
import { WeightManagementGoal } from "../store/register/registerStore.types";

interface BoxProps {
  onPress: () => void;
  selected: boolean;
  value: { emoji: string; text: string };
}

function Box({ onPress, selected, value }: BoxProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {selected ? (
        <View className=" my-5 flex w-64 items-center justify-center gap-2 rounded-xl bg-orange-500 px-5 py-3 ">
          <Text className="text-2xl">{value.emoji}</Text>
          <Text className="text-xl text-white">{value.text}</Text>
        </View>
      ) : (
        <View className=" my-5 flex w-64 items-center justify-center gap-2 rounded-xl bg-orange-300 px-5 py-3 ">
          <Text className="text-2xl">{value.emoji}</Text>
          <Text className="text-xl text-white">{value.text}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

interface Item {
  id: number;
  emoji: string;
  text: string;
  macros: { kcal: number; protein: number; carbs: number; fat: number };
  value: WeightManagementGoal;
  selected: boolean;
}

export default function RegisterFirstStepScreen() {
  const [isSelected, setIsSelected] = useState<Item[]>([
    {
      id: 1,
      emoji: "🔥",
      text: "Utrata masy ciała",
      macros: { kcal: 1750, protein: 700, carbs: 525, fat: 525 },
      value: WeightManagementGoal.WEIGHT_LOSS,
      selected: false,
    },
    {
      id: 2,
      emoji: "💪",
      text: "Przyrost masy ciała",
      macros: { kcal: 2750, protein: 1100, carbs: 825, fat: 825 },
      value: WeightManagementGoal.WEIGHT_GAIN,
      selected: false,
    },
    {
      id: 3,
      emoji: "⚖️",
      text: "Utrzymanie masy ciała",
      macros: { kcal: 2250, protein: 900, carbs: 675, fat: 675 },
      value: WeightManagementGoal.WEIGHT_MAINTENANCE,
      selected: false,
    },
  ]);
  const setUserWeightManagementGoal = useRegisterStore(
    (state) => state.setUserWeightManagementGoal,
  );

  function onClick(item: Item) {
    let updatedState = isSelected.map((selectedItem) => {
      return selectedItem.id === item.id
        ? { ...selectedItem, selected: true }
        : { ...selectedItem, selected: false };
    });
    setIsSelected(updatedState);
  }

  function handleGoToSecondStep() {
    const selectedGoal = isSelected.filter((item) => item.selected)[0];
    if (selectedGoal !== undefined) {
      setUserWeightManagementGoal(selectedGoal.value, selectedGoal.macros);
      router.push("/RegisterSecondStep");
    }
  }

  return (
    <SafeAreaView className="flex-0">
      <Stack.Screen options={{ headerShown: false }} />

      <View className="flex h-full flex-col justify-between">
        <ProgressBar progress={0.33} />

        <View className="flex items-center gap-5">
          <Text className="text-4xl">Wypełnij swoje dane</Text>
          <Text className="text-lg text-gray-600">
            Co chcesz osiągnąć z FoodHub?
          </Text>
        </View>

        <View className="flex flex-col items-center justify-center ">
          {isSelected.map((item) => (
            <Box
              onPress={() => onClick(item)}
              selected={item.selected}
              key={item.id}
              value={item}
            />
          ))}
        </View>

        <View className=" mx-5 my-4">
          <TouchableOpacity
            className="rounded-full bg-orange-400 px-4 py-4 shadow-lg"
            onPress={handleGoToSecondStep}
          >
            <Text className="text-center text-lg text-white ">Dalej</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
