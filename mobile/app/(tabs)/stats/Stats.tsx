import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";

import BackButton from "../../../components/BackButton";
import AvgCaloriesChart from "./components/AvgCaloriesChart";
import { useProfile } from "../profile/useProfile";
import { getUserMacros } from "../../../services/userService";
import LoadingScreen from "../../../components/LoadingScreen";
import { ScrollView } from "react-native-gesture-handler";

interface MacroData {
  proteins: number;
  carbs: number;
  fats: number;
  kcal: number;
}

export default function Stats() {
  const [chartData, setchartData] = useState<{
    totalAvgKcal: number;
    avgProteins: number;
    avgFats: number;
    avgCarbs: number;
    chartTitle: string;
  }>({
    totalAvgKcal: 0,
    avgProteins: 0,
    avgFats: 0,
    avgCarbs: 0,
    chartTitle: "",
  });

  function calculateAverageKcal(data: MacroData[]): number {
    if (data.length === 0) return 0;

    const totalKcal = data.reduce((sum, item) => sum + item.kcal, 0);
    return totalKcal / data.length;
  }

  function calculateMacrosPercentage(
    data: MacroData[],
    macro: keyof MacroData,
  ): number {
    if (data.length === 0) return 0;

    const totalMacro = data.reduce((sum, item) => sum + item[macro], 0);
    const totalKcal = data.reduce((sum, item) => sum + item.kcal, 0);

    const kcalPerGram = macro === "fats" ? 9 : 4;
    const percentage = ((totalMacro * kcalPerGram) / totalKcal) * 100;

    return Math.round(percentage);
  }

  function addTitle(index: number): string {
    switch (index) {
      case 0:
        return `Obiady\nŚredni Rozkład Makro`;
      case 1:
        return `Śniadania\nŚredni Rozkład Makro`;
      case 2:
        return `Kolacje\nŚredni Rozkład Makro`;
      case 3:
        return `Przekąski\nŚredni Rozkład Makro`;
      default:
        return `Średni Rozkład Makro`;
    }
  }

  const queryClient = useQueryClient();
  const { user, isLoading: isLoadingProfile } = useProfile();
  const { data: macros, isLoading: isLoadingMacros } = useQuery({
    queryKey: ["userMacros"],
    queryFn: async () => {
      if (user?.id) {
        return await getUserMacros(user.id);
      } else throw new Error("Nie znaleziono przepisu");
    },
    onSuccess(data) {
      if (data !== undefined && data.length) {
        if (data?.length) {
          setchartData({
            totalAvgKcal: calculateAverageKcal(data),
            avgCarbs: calculateMacrosPercentage(data, "carbs"),
            avgFats: calculateMacrosPercentage(data, "fats"),
            avgProteins: calculateMacrosPercentage(data, "proteins"),
            chartTitle: `Średni Rozkład Makro`,
          });
        }
      }
    },
  });

  useEffect(() => {
    queryClient.invalidateQueries(["userMacros"]);
  }, []);

  if (isLoadingMacros || isLoadingProfile) return <LoadingScreen />;

  return (
    <View>
      <View className="mt-4 flex flex-row items-center justify-between px-4 py-4">
        <BackButton />
        <Text>Twoje statystyki</Text>
        <View className="h-10 w-10"></View>
      </View>
      <ScrollView className="h-full">
        {!!macros && (
          <View className="my-4 flex flex-col px-4">
            <AvgCaloriesChart chartData={chartData} />
          </View>
        )}
      </ScrollView>
    </View>
  );
}
