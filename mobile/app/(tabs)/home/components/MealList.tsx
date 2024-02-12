import { View } from "react-native";
import { MealItemList } from "./MealItemList";
import { useMutation } from "react-query";
import { deleteMeal } from "../../../../services/mealsAPI";
import Spinner from "../../../../components/Spinner";

export default function MealList({
  meals,
}: {
  meals: any[] | null | undefined;
}) {
  const deleteMealMutation = useMutation(deleteMeal);
  const { isLoading } = deleteMealMutation;

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <View className="flex flex-col">
          {meals?.map((item) => (
            <MealItemList key={item.id} item={item} id={item.id} />
          ))}
        </View>
      )}
    </>
  );
}
