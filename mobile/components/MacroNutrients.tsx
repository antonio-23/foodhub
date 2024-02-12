import { View } from "react-native";
import MacroItem from "../app/(tabs)/home/components/MacroItem";
import { useMacros } from "../app/(tabs)/profile/useMacros";
import LoadingScreen from "./LoadingScreen";
import { useProfile } from "../app/(tabs)/profile/useProfile";

export default function MacroNutrients({ macro }: { macro: any }) {
  const { user, isLoading: isLoadingProfile } = useProfile();
  const id = user?.id as string;
  const { macros, isLoading } = useMacros(id);

  if (isLoading) return <LoadingScreen />;

  const { fat, protein, carbs, kcal } = macros?.at(0)?.macros;

  const diet = {
    maxCalories: kcal,
    curCalories: macro.totalKcal,
    maxProtein: protein,
    curProtein: macro.totalProtein,
    maxFat: fat,
    curFat: macro.totalFats,
    maxCarbohydrates: carbs,
    curCarbohydrates: macro.totalCarbs,
  };

  const percentages = {
    percentOfAllCalories: (diet.curCalories / diet.maxCalories).toFixed(2),
    percentOfProtein: (diet.curProtein / diet.maxProtein).toFixed(2),
    percentOfFat: (diet.curFat / diet.maxFat).toFixed(2),
    percentOfCarbohydrates: (
      diet.curCarbohydrates / diet.maxCarbohydrates
    ).toFixed(2),
  };

  return (
    <View className="mx-5 mb-5 flex flex-row items-center justify-around rounded-2xl bg-neutral-800 p-3 shadow-lg shadow-gray-500/40">
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
  );
}
