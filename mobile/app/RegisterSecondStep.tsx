import { View, Text } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import React, { useState } from "react";
import { Stack, router } from "expo-router";
import { TouchableOpacity } from "react-native-gesture-handler";
import ProgressBar from "../components/ProgressBar";
import { useRegisterStore } from "../store/register/registerStore";
import { PhysicalActivity } from "../store/register/registerStore.types";
interface BoxProps {
  onPress: () => void;
  selected: boolean;
  value: { emoji: string; text: string };
}

function Box({ onPress, selected, value }: BoxProps) {
  return (
    <TouchableOpacity onPress={onPress}>
      {selected ? (
        <View className="m-1 h-36 w-40 items-center justify-evenly rounded-xl bg-orange-500">
          <Text className="text-2xl text-white">{value.text}</Text>
          <Text className=" text-4xl">{value.emoji}</Text>
        </View>
      ) : (
        <View className="m-1 h-36 w-40 items-center justify-evenly rounded-xl bg-orange-300">
          <Text className="text-2xl text-white">{value.text}</Text>
          <Text className=" text-4xl">{value.emoji}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

interface Item {
  id: number;
  emoji: string;
  text: string;
  value: PhysicalActivity;
  selected: boolean;
}

export default function RegisterSecondStep() {
  const [isSelected, setIsSelected] = useState<Item[]>([
    {
      id: 1,
      emoji: "☹️",
      text: "Bardzo niski",
      value: PhysicalActivity.VERY_LOW,
      selected: false,
    },
    {
      id: 2,
      emoji: "😕",
      text: "Niski",
      value: PhysicalActivity.LOW,
      selected: false,
    },
    {
      id: 3,
      emoji: "🙂",
      text: "Średni",
      value: PhysicalActivity.MEDIUM,
      selected: false,
    },
    {
      id: 4,
      emoji: "😄",
      text: "Wysoki",
      value: PhysicalActivity.HIGH,
      selected: false,
    },
  ]);
  const setPhysicalActivity = useRegisterStore(
    (state) => state.setPhysicalActivity,
  );

  function onClick(item: Item) {
    let updatedState = isSelected.map((selectedItem) => {
      return selectedItem.id === item.id
        ? { ...selectedItem, selected: true }
        : { ...selectedItem, selected: false };
    });
    setIsSelected(updatedState);
  }

  function handleGoToThirdStep() {
    const selectedActvity = isSelected.filter((item) => item.selected)[0];
    if (selectedActvity !== undefined) {
      setPhysicalActivity(selectedActvity.value);
      router.push("/RegisterThirdStep");
    }
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="mx-2 flex h-full flex-col justify-between">
        <ProgressBar progress={0.66} />

        <View className="flex items-center gap-5">
          <Text className="text-4xl">Wypełnij swoje dane</Text>
          <Text className="text-lg text-gray-600">
            Jaki jest twój poziom ruchu w ciągu dnia bez treningu?
          </Text>
        </View>
        <View className="flex items-center justify-center">
          <View className="flex flex-row flex-wrap  ">
            {isSelected.map((item) =>
              item.id === 1 || item.id === 2 ? (
                <Box
                  onPress={() => onClick(item)}
                  selected={item.selected}
                  key={item.id}
                  value={item}
                />
              ) : (
                ""
              ),
            )}
          </View>
          <View className="flex flex-row flex-wrap">
            {isSelected.map((item) =>
              item.id === 3 || item.id === 4 ? (
                <Box
                  onPress={() => onClick(item)}
                  selected={item.selected}
                  key={item.id}
                  value={item}
                />
              ) : (
                ""
              ),
            )}
          </View>
        </View>
        <View className="my-4">
          <TouchableOpacity
            className="rounded-full bg-orange-400 px-4 py-4 shadow-lg"
            onPress={handleGoToThirdStep}
          >
            <Text className="text-center text-lg text-white ">Dalej</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
