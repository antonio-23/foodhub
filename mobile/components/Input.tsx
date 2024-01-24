import React from "react";
import { View, Text, TextInput, InputModeOptions } from "react-native";

export default function Input({
  label,
  placeholder,
  secureTextEntry,
  inputMode,
  action,
  autoCapitalize,
  editable,
  value,
  multiline,
  numberOfLines,
  selectTextOnFocus,
  defaultValue,
}: {
  label?: string;
  placeholder?: string;
  secureTextEntry?: boolean;
  inputMode?: InputModeOptions;
  action?: React.Dispatch<React.SetStateAction<any>>;
  autoCapitalize?: "none" | "sentences" | "words" | "characters" | undefined;
  editable?: boolean | undefined;
  value?: string;
  multiline?: boolean;
  numberOfLines?: number;
  selectTextOnFocus?: boolean;
  defaultValue?: string;
}) {
  return (
    <View className="mb-6 flex w-full">
      <Text className="text-sm text-gray-500">{label}</Text>
      <TextInput
        placeholder={placeholder}
        secureTextEntry={secureTextEntry}
        className={`${
          multiline ? `rounded-lg border` : `border-b`
        } border-orange-400 pb-1 text-lg font-medium placeholder:text-black`}
        inputMode={inputMode}
        onChangeText={action}
        autoCapitalize={autoCapitalize}
        editable={editable}
        value={value}
        placeholderTextColor="#d1d5db"
        multiline={multiline}
        numberOfLines={numberOfLines}
        selectTextOnFocus={selectTextOnFocus}
        defaultValue={defaultValue}
      />
    </View>
  );
}
