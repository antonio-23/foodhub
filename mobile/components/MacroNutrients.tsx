import { View } from "react-native";
import MacroItem from "../app/(tabs)/home/components/MacroItem";

export default function MacroNutrients({ macro }: { macro: any }) {
  // TO SA DANE DO TESTU JAK TO BEDZIE WYGLADAC OBIEKTY diet ORAZ percentages BEDA FETCHOWANE Z BAZY / POTEM DO USUNIECIA
  const diet = {
    maxCalories: 3533,
    curCalories: macro.totalKcal,
    maxProtein: 167,
    curProtein: macro.totalProtein,
    maxFat: 112,
    curFat: macro.totalFats,
    maxCarbohydrates: 528,
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
