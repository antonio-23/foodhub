import { Platform, View } from "react-native";
import { getArrayWitchDates } from "../utils/getArrayWithDates";
import CalendarCard from "./CalendarCard";

export default function Calendar() {
  const datesArr = getArrayWitchDates();
  const daysOfWeek: string | any[] = [];

  Platform.OS === "ios"
    ? datesArr.map((el) => daysOfWeek.push(el.split(" ")))
    : datesArr.map((el) => daysOfWeek.push(el.split(",")));

  return (
    <View className="m-5 flex flex-row items-center justify-center">
      {daysOfWeek.map((date) => (
        <CalendarCard arr={date} key={date.at(1)} />
      ))}
    </View>
  );
}
