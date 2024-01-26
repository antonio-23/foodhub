import { ScrollView, View } from "react-native";
import React from "react";
import Header from "../../../components/Header";
import Calendar from "../../../components/Calendar";
import MacroNutrients from "../../../components/MacroNutrients";
import LoadingScreen from "../../../components/LoadingScreen";
import MealComponent from "./components/MealComponent";
import { useQuery, useQueryClient } from "react-query";
import { getLoggedUserId, getUserDetails } from "../../../services/authAPI";
import { getAllMeals } from "../../../services/mealsAPI";
import { getTotalMacro } from "../../../utils/getTotalMacro";
import { getCalculatedMacroOfAllMeals } from "../../../utils/getCalculatedMacroOfAllMeals";

export default function Home() {
  const { data: userId, isLoading: isLoading2 } = useQuery({
    queryFn: getLoggedUserId,
    queryKey: ["currentUserId"],
  });

  const { data: userInfo, isLoading } = useQuery({
    queryKey: ["userDetails"],
    queryFn: () => getUserDetails,
  });

  const { data: allMeals, isLoading: isLoading3 } = useQuery({
    queryKey: ["mealsDetails"],
    queryFn: () => getAllMeals({ userId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["mealsDetails"] });
    },
  });

  const queryClient = useQueryClient();
  queryClient.setQueryData(["userInfo"], userInfo);

  const calculatedMeals = getTotalMacro({ allMeals });
  const calculatedMacro = getCalculatedMacroOfAllMeals(calculatedMeals);
  const { totalBreakfast, totalDinner, totalSnacks, totalSuppers } =
    calculatedMeals;

  if (isLoading || isLoading2 || isLoading3) return <LoadingScreen />;

  return (
    <View>
      <ScrollView className="h-screen">
        <Header />
        <Calendar />
        <MacroNutrients macro={calculatedMacro} />

        <MealComponent
          title={"Śniadanie"}
          name={"breakfasts"}
          calories={{
            total: totalBreakfast.totalKcal,
            proteins: totalBreakfast.totalProteins,
            fats: totalBreakfast.totalFats,
            carbs: totalBreakfast.totalCarbs,
          }}
        />

        <MealComponent
          title={"Obiad"}
          name={"dinners"}
          calories={{
            total: totalDinner.totalKcal,
            proteins: totalDinner.totalProteins,
            fats: totalDinner.totalFats,
            carbs: totalDinner.totalCarbs,
          }}
        />

        <MealComponent
          title={"Przekąska"}
          name={"snacks"}
          calories={{
            total: totalSuppers.totalKcal,
            proteins: totalSuppers.totalProteins,
            fats: totalSuppers.totalFats,
            carbs: totalSuppers.totalCarbs,
          }}
        />

        <MealComponent
          title={"Kolacja"}
          name={"suppers"}
          calories={{
            total: totalSuppers.totalKcal,
            proteins: totalSuppers.totalProteins,
            fats: totalSuppers.totalFats,
            carbs: totalSuppers.totalCarbs,
          }}
        />
      </ScrollView>
    </View>
  );
}
