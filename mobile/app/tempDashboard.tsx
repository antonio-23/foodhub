import React from "react";
import { Text, View, Alert } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import BackButton from "../components/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRegisterStore } from "../store/register/registerStore";
import { AuthCredentials, signUp } from "../services/authAPI";
import { useMutation } from "react-query";
import { UserInformations, addUserInformation } from "../services/userService";

/**
 * DO WYŚWIETLENIA DANYCH NA ZAJĘCIACH - POTEM USUNĄĆ TEN KOMPONENT
 */

const TempDashboardScreen = () => {
  const user = useRegisterStore((state) => state.user);
  const {
    name,
    email,
    password,
    weightManagementGoal,
    physicalActivity,
    gender,
    birthDate,
    height,
    actualWeight,
    weightGoal,
  } = user;

  const {
    mutate: handleRegister,
    data: authData,
    isLoading: isAuthLoading,
    error: authError,
  } = useMutation(
    async (credentials: AuthCredentials) => {
      return await signUp(credentials);
    },
    {
      onSuccess: (data) => {
        handleAddUserInformations({
          name,
          email,
          weightManagementGoal,
          physicalActivity,
          gender,
          birthDate,
          height,
          actualWeight,
          weightGoal,
          userId: data.user.id,
        });
        router.push("/login");
      },
    },
  );

  const {
    mutate: handleAddUserInformations,
    data: userData,
    isLoading,
    isError,
    error: userError,
  } = useMutation(async (userInfo: UserInformations) => {
    return await addUserInformation(userInfo);
  });

  async function handleFinishRegistration() {
    handleRegister({
      email,
      password,
      name,
      birthDate: new Date(birthDate),
      weightManagementGoal,
      physicalActivity,
      gender,
      height,
      actualWeight,
      weightGoal,
    });
    if (authError) Alert.alert("Błąd w trakcie rejestracji");
    if (!authData?.session) {
      Alert.alert(
        "Zweryfikuj swój email poprzez link aktywacyjny wysłany na twoją skrzynkę pocztową",
      );
      router.push("/login");
    }
  }

  return (
    <SafeAreaView>
      <Stack.Screen options={{ headerShown: false }} />
      <View className="px-5">
        <View>
          <BackButton />
          <Text className="my-2 text-center text-4xl">Zweryfikuj dane</Text>
          <Text className="flex-0 mb-1 mt-4 text-left text-sm font-medium">
            Email: {email}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Imie i nazwisko: {name}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Płeć: {gender}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Data urodzin: {birthDate.toString()}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Wzrost: {height}cm
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Aktywność fizyczna: {physicalActivity}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Cel wagowy: {weightManagementGoal}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Aktualna waga: {actualWeight}
          </Text>
          <Text className="flex-0 my-1 text-left text-sm font-medium">
            Waga docelowa: {weightGoal}
          </Text>
        </View>
        <View className="flex flex-col items-center justify-center">
          <Text className="flex-0 my-2 text-left text-lg"></Text>
        </View>
        <TouchableOpacity
          className="flex items-center justify-center rounded-full bg-orange-400 px-16 py-4 shadow-lg"
          onPress={handleFinishRegistration}
        >
          <Text className="text-center text-lg text-white">Utwórz konto</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default TempDashboardScreen;
