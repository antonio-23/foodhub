import React from "react";

import {
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
  Text,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";

import { images } from "../constants";
import { getLoggedUserId } from "../services/authAPI";
import { useQuery } from "react-query";

const WelcomeScreen = () => {
  const router = useRouter();
  const { data: userId, isLoading } = useQuery({
    queryFn: getLoggedUserId,
    queryKey: ["currentUserId"],
  });
  return (
    <View className="flex-1">
      <StatusBar barStyle="dark-content" />
      <Stack.Screen options={{ headerShown: false }} />
      <ImageBackground
        source={images.welcomeBg}
        resizeMode="cover"
        className="flex-1"
      >
        <View className="mt-32 flex items-center justify-start">
          <Image source={images.logo} />
        </View>

        <View className="flex min-h-screen justify-center gap-2 px-5">
          <TouchableOpacity
            className="rounded-full bg-orange-400 px-16 py-4"
            onPress={() => router.push("/login")}
          >
            <Text className="text-center text-lg font-medium text-white">
              Logowanie
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="rounded-full border-2 border-orange-400 px-16 py-4 "
            onPress={() => router.push("/register")}
          >
            <Text className="text-center text-lg font-medium text-white">
              Rejestracja
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

export default WelcomeScreen;
