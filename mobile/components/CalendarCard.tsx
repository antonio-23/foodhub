import { Platform, Text, View } from "react-native";

interface CalendarCardProps {
  arr: any[];
}

export default function CalendarCard({ arr }: CalendarCardProps) {
  const dayOfMonth = arr.at(1);
  const dayOfWeek = arr.at(0);
  const date = new Date().getDate();

  if (Number(dayOfMonth) === Number(date)) {
    return (
      <View className="flex h-16 w-12 flex-col items-center justify-center rounded-xl bg-orange-200">
        <Text className="text-xl font-bold text-orange-600">{dayOfMonth}</Text>
        <Text className=" text-sm text-orange-600">
          {Platform.OS === "android" ? dayOfWeek.slice(0, -1) : dayOfWeek}
        </Text>
      </View>
    );
  } else {
    return (
      <View className="flex w-12 flex-col items-center justify-center">
        <Text className="text-xl font-bold">{dayOfMonth}</Text>
        <Text className="text-sm text-gray-700">
          {Platform.OS === "android" ? dayOfWeek.slice(0, -1) : dayOfWeek}
        </Text>
      </View>
    );
  }
}
