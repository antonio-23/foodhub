import { Text, View } from "react-native";
import Spinner from "./Spinner";

export default function LoadingScreen() {
  return (
    <View className=" flex h-screen items-center justify-center">
      <Spinner />
    </View>
  );
}
