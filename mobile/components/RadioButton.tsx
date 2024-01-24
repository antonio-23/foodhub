import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";

interface RadioButtonProps {
  onPress: () => void;
  selected: boolean;
  children: React.ReactNode;
}

export function RadioButton({ onPress, selected, children }: RadioButtonProps) {
  return (
    <View className="mb-5 flex flex-row items-center gap-3">
      <TouchableOpacity
        onPress={onPress}
        className="flex h-6 w-6  items-center justify-center rounded-full border-2 border-gray-300 bg-gray-200"
      >
        {selected ? (
          <View className="flex h-3 w-3 items-center justify-center rounded-full bg-orange-500"></View>
        ) : null}
      </TouchableOpacity>
      <Text>{children}</Text>
    </View>
  );
}
