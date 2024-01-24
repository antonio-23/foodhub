import { Text, View } from "react-native";
import { useQueryClient } from "react-query";
import MacroItem from "./MacroItem";

export default function MacroBars({
  totalCalories,
  macro,
}: {
  macro: {
    totalKcal: number;
    totalProtein: number;
    totalFats: number;
    totalCarbs: number;
  };
  totalCalories: number;
}) {
  const diet = {
    maxCalories: 548,
    curCalories: macro?.totalKcal,
    maxProtein: 72,
    curProtein: macro?.totalProtein,
    maxFat: 96,
    curFat: macro?.totalFats,
    maxCarbohydrates: 332,
    curCarbohydrates: macro?.totalCarbs,
  };

  const queryClient = useQueryClient();
  const type: any = queryClient.getQueryData(["currentMeal"]);
  const user: any = queryClient.getQueryData(["currentUser"]);

  const percentages = {
    percentOfAllCalories: (diet.curCalories / diet.maxCalories).toFixed(2),
    percentOfProtein: (diet.curProtein / diet.maxProtein).toFixed(2),
    percentOfFat: (diet.curFat / diet.maxFat).toFixed(2),
    percentOfCarbohydrates: (
      diet.curCarbohydrates / diet.maxCarbohydrates
    ).toFixed(2),
  };

  return (
    <View className="mx-5 mb-10 flex flex-col rounded-2xl bg-neutral-800 p-3 shadow-lg shadow-gray-500/40">
      <View className="flex flex-row items-center gap-5 pb-5">
        <Text className="pl-2 text-lg font-semibold text-white">
          Total {type}
        </Text>
        <Text className="text-lg font-medium text-white">
          {totalCalories} kcal
        </Text>
      </View>

      <View className="flex flex-row items-center justify-around">
        <MacroItem
          color="#60A5FA"
          progress={Number(percentages.percentOfAllCalories)}
          text1={`${diet.curCalories}`}
          text2={`/ ${diet.maxCalories}`}
          name="Kcal"
        />
        <MacroItem
          color="#F87171"
          progress={Number(percentages.percentOfProtein)}
          text1={`${diet.curProtein}g `}
          text2={`/ ${diet.maxProtein}g`}
          name="Biako"
        />
        <MacroItem
          color="#FACC15"
          progress={Number(percentages.percentOfFat)}
          text1={`${diet.curFat}g `}
          text2={`/ ${diet.maxFat}g`}
          name="Tłuszcze"
        />
        <MacroItem
          color="#4ADE80"
          progress={Number(percentages.percentOfCarbohydrates)}
          text1={`${diet.curCarbohydrates}g `}
          text2={`/ ${diet.maxCarbohydrates}g`}
          name="Węgl."
        />
      </View>
    </View>
  );
}
