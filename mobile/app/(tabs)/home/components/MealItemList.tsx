import { AntDesign } from "@expo/vector-icons";
import { Text, TouchableOpacity, View } from "react-native";
import { useMutation, useQueryClient } from "react-query";
import { deleteMeal as deleteMealApi } from "../../../../services/mealsAPI";

interface DeleteMealVariables {
  id: number;
  mealType: string;
}

export function MealItemList({ item }: { item?: any }) {
  const queryClient = useQueryClient();
  const mealType: string = queryClient.getQueryData(["currentMeal"]) || "";

  const { isLoading: isDeleting, mutate: deleteMeal } = useMutation<
    null,
    unknown,
    DeleteMealVariables,
    unknown
  >({
    mutationFn: deleteMealApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealsDetails"] });
    },
    onError: (err) => console.error(err),
  });

  return (
    <View className="mx-5 my-1 flex flex-col rounded-2xl border border-gray-300 bg-white p-4">
      <View className="mb-2 flex flex-row items-center justify-between">
        <Text className=" text-lg font-semibold">{item.name}</Text>
        <TouchableOpacity onPress={() => deleteMeal({ id: item.id, mealType })}>
          <AntDesign name="close" size={22} color="black" />
        </TouchableOpacity>
      </View>

      <View className="flex flex-row items-center justify-between">
        <View className=" flex flex-row items-center">
          <Text className=" text-base">Total </Text>
          <Text className=" text-sm text-gray-600">{item.kcal} kcal</Text>
        </View>

        <View className="flex flex-row items-center gap-5">
          <Text className="text-base">
            B: <Text className="text-sm text-gray-600">{item.proteins}</Text>{" "}
          </Text>
          <Text className="text-base">
            T: <Text className="text-sm text-gray-600">{item.fats}</Text>{" "}
          </Text>
          <Text className="text-base">
            W: <Text className="text-sm text-gray-600">{item.carbs}</Text>{" "}
          </Text>
        </View>
      </View>
    </View>
  );
}
