import { View, TouchableOpacity } from "react-native";
import React, { useEffect, useRef } from "react";
import { TextInput } from "react-native-gesture-handler";
import { Entypo } from "@expo/vector-icons";

interface SearchBarProps {
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  query: string;
  handleClick: () => void;
}

export default function SearchBar({
  setQuery,
  query,
  handleClick,
}: SearchBarProps) {
  const inputRef = useRef<TextInput>(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [query]);

  return (
    <View className="flex justify-center">
      <TextInput
        className="rounded-full border border-orange-500 px-5 pb-3 pt-2 placeholder:text-lg"
        placeholder="Szukaj przepisów..."
        placeholderTextColor="#9CA3AF"
        onChangeText={(text) => setQuery(text)}
        value={query}
        ref={inputRef}
      />

      <View className="absolute right-0  h-[49px] w-[49px] rounded-full bg-orange-500">
        <TouchableOpacity className="m-auto" onPress={handleClick}>
          <Entypo name="magnifying-glass" size={24} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}
