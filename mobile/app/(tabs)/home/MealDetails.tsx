import { ScrollView, Text, View } from "react-native";
import { useQuery, useQueryClient } from "react-query";
import MacroBars from "./components/MacroBars";
import { TouchableOpacity } from "react-native-gesture-handler";
import { AntDesign } from "@expo/vector-icons";
import { useState } from "react";
import NewMeal from "./NewMeal";
import { fetchSingleMeal } from "../../../services/mealsAPI";
import LoadingScreen from "../../../components/LoadingScreen";
import { getTotalMacro } from "../../../utils/getTotalMacro";
import { getCalculatedMacroOfAllMeals } from "../../../utils/getCalculatedMacroOfAllMeals";
import NavigationHeader from "../../../components/NavigationHeader";
import MealList from "./components/MealList";

export default function MealDetails() {
  const [addingNewMeal, setAddingNewMeal] = useState<boolean>(false);
  const queryClient = useQueryClient();

  const userId: string = queryClient.getQueryData(["currentUserId"]) || "";
  const allMeals = queryClient.getQueryData(["mealsDetails"]);
  const mealData = queryClient.getQueryData<string[]>(["currentMeal"]) || [
    "",
    "",
  ];
  const [mealType, title] = mealData;

  const { data: meals, isLoading } = useQuery({
    queryKey: ["singleMealDetails"],

    queryFn: () => fetchSingleMeal({ mealType, userId }),
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["singleMealDetails"] });
    },
  });

  const totalCalories = meals?.reduce((acc, val) => acc + val.kcal, 0);
  const calculatedMeals = getTotalMacro({ allMeals });
  const calculatedMacro = getCalculatedMacroOfAllMeals(calculatedMeals);

  if (isLoading) return <LoadingScreen />;

  if (!addingNewMeal)
    return (
      <View className="h-full">
        <NavigationHeader label={title} />
        <ScrollView>
          <MacroBars
            macro={calculatedMacro}
            totalCalories={totalCalories}
            title={title}
          />

          {meals?.length ? (
            <MealList meals={meals} />
          ) : (
            <Text className="mx-auto text-base">
              Brak wprowadzonych posiłków. 😢
            </Text>
          )}
        </ScrollView>

        <View className="absolute right-10 top-[86%]">
          <TouchableOpacity
            onPress={() => setAddingNewMeal((addingNewMeal) => !addingNewMeal)}
          >
            <View className=" h-14 w-14 items-center justify-center rounded-full bg-orange-500 shadow-lg shadow-orange-500/40">
              <AntDesign name="plus" size={28} color="white" />
            </View>
          </TouchableOpacity>
        </View>
      </View>
    );
  else
    return (
      <NewMeal
        setAddingNewMeal={setAddingNewMeal}
        addingNewMeal={addingNewMeal}
      />
    );
}
