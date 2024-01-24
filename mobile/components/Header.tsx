import { Text } from "react-native";
import { View } from "react-native-animatable";

export default function Header() {
  const month = new Date().toLocaleString("default", { month: "long" });
  const year = new Date().toLocaleString("default", { year: "2-digit" });
  const fixedMonth = month.charAt(0).toLocaleUpperCase() + month.slice(1);

  return (
    <View className="mx-5 mt-2 flex flex-row items-center">
      <View className="flex w-1/3 flex-row">
        <Text className="text-base">Food</Text>
        <Text className="text-base text-orange-400">Hub</Text>
      </View>

      <View className="w-1/3">
        <Text className=" text-center text-[15px] text-stone-800">{`${fixedMonth} 20${year}`}</Text>
      </View>
    </View>
  );
}
