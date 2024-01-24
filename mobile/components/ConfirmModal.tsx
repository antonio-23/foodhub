import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { router } from "expo-router";

export default function ConfirmModal({
  setShowConfirmModal,
}: {
  setShowConfirmModal: (value: boolean) => void;
}) {
  return (
    <View className="absolute left-0 top-0 h-screen w-screen bg-white/30 p-2">
      <View className="top-[30%] mx-5  rounded-xl border border-gray-300 bg-white px-10 py-16 shadow-lg shadow-gray-400">
        <Text className=" mb-10 text-xl font-medium">
          Czy napewno chcesz anulować?
        </Text>

        <View className="flex flex-row items-center justify-evenly gap-5">
          <TouchableOpacity
            onPress={() => router.back()}
            className="w-5/12 rounded-3xl border border-orange-400 py-3"
          >
            <Text className="text-center text-lg text-orange-400">Anuluj</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setShowConfirmModal(false)}
            className="w-5/12 rounded-3xl bg-orange-400 py-3"
          >
            <Text className="text-center text-lg text-white">Kontynuuj</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}
