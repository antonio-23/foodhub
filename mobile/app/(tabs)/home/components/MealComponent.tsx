import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import { useQueryClient } from "react-query";

interface meal {
  title: string;
  name: string;
  calories?: {
    total: number;
    proteins: number;
    fats: number;
    carbs: number;
  };
}

export default function MealComponent({
  title,
  name,
  calories = { total: 0, proteins: 0, fats: 0, carbs: 0 },
}: meal) {
  const queryClient = useQueryClient();

  function handleClick() {
    queryClient.setQueryData(["currentMeal"], [name, title]);
    router.push("/(tabs)/home/MealDetails");
  }

  if (calories?.total > 0)
    return (
      <TouchableOpacity onPress={handleClick}>
        <View className="mx-5 my-1 flex flex-row items-center justify-between rounded-2xl border border-gray-300 bg-white p-4 shadow-lg shadow-gray-200">
          <View className="flex flex-col">
            <View className="mb-4 flex flex-row items-center gap-3">
              <Text className="text-lg font-bold">{title}</Text>
              <Text className="font-normal text-gray-600">{`${calories.total} kcal`}</Text>
            </View>

            <View className="flex flex-row items-center gap-3">
              <View className="flex flex-row items-center">
                <Text className="text-sm font-semibold">Białko</Text>
                <Text className="ml-2 text-sm  font-normal text-gray-600">{`${calories.proteins}g`}</Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-sm font-semibold">Tłuszcze</Text>
                <Text className="ml-2 text-sm font-normal text-gray-600">{`${calories.fats}g`}</Text>
              </View>

              <View className="flex flex-row items-center">
                <Text className="text-sm font-semibold">Węgl.</Text>
                <Text className="ml-2 text-sm font-normal text-gray-600">{`${calories.carbs}g`}</Text>
              </View>
            </View>
          </View>

          <View>
            <AntDesign name="right" size={18} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
  else
    return (
      <TouchableOpacity onPress={handleClick}>
        <View className="mx-5 my-1 flex flex-row items-center justify-between rounded-2xl border border-gray-300 bg-white p-4 shadow-lg shadow-gray-200">
          <View className="flex flex-row items-center gap-5">
            <Text className="text-lg font-bold">{title}</Text>
            <Text className="font-normal text-gray-600">{`0 kcal`}</Text>
          </View>

          <View>
            <AntDesign name="right" size={18} color="black" />
          </View>
        </View>
      </TouchableOpacity>
    );
}
