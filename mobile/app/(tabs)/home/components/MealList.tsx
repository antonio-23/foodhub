import { Text, View } from "react-native";
import { MealItemList } from "./MealItemList";

export default function MealList({
  meals,
}: {
  meals: any[] | null | undefined;
}) {
  return (
    <View className="flex flex-col">
      {meals?.map((item) => <MealItemList key={item.id} item={item} />)}
      {/* <MealItemList key={1} /> */}
    </View>
  );
}
