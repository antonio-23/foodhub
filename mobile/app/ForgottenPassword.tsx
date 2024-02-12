import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  Alert,
} from "react-native";
import React from "react";
import KeyboardProvider from "../components/Keyboard";
import { Stack } from "expo-router";
import Bubbles from "../components/Bubbles";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Spinner from "../components/Spinner";
import Error from "../components/Error";
import { useMutation } from "react-query";
import { resetPassword } from "../services/authAPI";

interface FormData {
  email: string;
}

export default function ForgottenPassword() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate: handleReset, isLoading } = useMutation({
    mutationFn: async (email: string) => {
      return await resetPassword(email);
    },
    onSuccess: () =>
      Alert.alert("Zmeień hasło w wiadomości wysłanej na podany adres email."),
    onError: () => Alert.alert("Podano błędne dane."),
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { email } = data;
    handleReset(email);
  };

  return (
    <KeyboardProvider>
      <KeyboardProvider.CustomKeyboardAvoidingView>
        <KeyboardProvider.HideKeyboard>
          <SafeAreaView style={{ flex: 1 }}>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="mx-5">
              <View className="my-5">
                <BackButton />
                <Text className="flex-0 mb-12 mt-8 text-left text-5xl font-medium">
                  Nowe hasło
                </Text>
              </View>
              <View className="flex items-center justify-center">
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: "Podanie adresu email jest wymagane",
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message: "Nie poprawny adres email!",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Email"
                      placeholder="Podaj adres e-mail"
                      inputMode="email"
                      autoCapitalize="none"
                      action={(text) => {
                        field.onChange(text);
                      }}
                    />
                  )}
                />
                {errors.email && <Error>{errors.email.message}</Error>}
              </View>
              <TouchableOpacity
                onPress={handleSubmit(onSubmit)}
                className=" flex h-[60px] items-center justify-center rounded-full bg-orange-400 px-16 py-4 shadow-lg"
              >
                <Text className="text-center text-lg text-white">
                  {isLoading ? <Spinner color="#fff" /> : "Wyślij"}
                </Text>
              </TouchableOpacity>
              <Bubbles />
            </View>
          </SafeAreaView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
}
