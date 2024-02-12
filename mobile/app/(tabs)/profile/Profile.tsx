import { View, Text, TouchableOpacity, Image } from "react-native";
import React, { useState } from "react";
import { logOut } from "../../../services/authAPI";
import { router } from "expo-router";
import {
  FontAwesome,
  Feather,
  Entypo,
  MaterialIcons,
} from "@expo/vector-icons";
import images from "../../../constants/images";
import Cart from "./components/Cart";
import { useProfile } from "./useProfile";
import Spinner from "../../../components/Spinner";

export default function Profile() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const { user, isLoading } = useProfile();
  const name = user?.user_metadata?.name;

  return (
    <>
      <View className="flex flex-col">
        <View className="z-10 mb-8 flex h-auto w-full rounded-b-[50px] bg-orange-100 pb-6 pt-10 shadow-sm">
          <View className="m-5 flex flex-row items-center justify-between">
            <TouchableOpacity
              onPress={() => setIsDarkMode(!isDarkMode)}
              className="flex h-10 w-10 items-center justify-center"
            >
              {isDarkMode ? (
                <Feather name="sun" size={28} color="black" />
              ) : (
                <FontAwesome name="moon-o" size={28} color="black" />
              )}
            </TouchableOpacity>

            <Text className=" text-base text-neutral-800">Mój profil</Text>

            <TouchableOpacity
              onPress={() => {
                logOut();
                router.push("/welcome");
              }}
            >
              <MaterialIcons name="logout" size={28} color="black" />
            </TouchableOpacity>
          </View>

          <View className="flex items-center">
            <View className="flex h-32 w-32 items-center">
              <Image
                source={images.avatarTemp}
                style={{ flex: 1, borderRadius: 32, resizeMode: "contain" }}
              />
            </View>
          </View>

          <View className="my-6 flex items-center">
            <Text className=" text-2xl font-normal">
              {isLoading ? <Spinner /> : name}
            </Text>
          </View>

          <View className="flex items-center justify-center">
            <TouchableOpacity
              onPress={() => router.push("/(tabs)/profile/EditProfile")}
              className=" w-1/3 rounded-3xl bg-orange-400  py-3 shadow-lg"
            >
              <Text className="text-center text-lg text-white">Edycja</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View className="relative flex h-1/2 w-full flex-col space-y-6 ">
          <Cart
            link="/(tabs)/profile/EditMeasurements"
            icon={<Entypo name="ruler" size={24} color="black" />}
            text="Parametry fizyczne"
          />
          <Cart
            link="/(tabs)/profile/EditMacros"
            icon={<Entypo name="list" size={24} color="black" />}
            text="Limit makroskładników"
          />
        </View>
      </View>
    </>
  );
}
