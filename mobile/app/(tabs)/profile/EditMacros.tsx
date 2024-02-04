import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import React from "react";
import NavigationHeader from "../../../components/NavigationHeader";
import Input from "../../../components/Input";
import KeyboardProvider from "../../../components/Keyboard";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EditMacrosFormData } from "../../../services/profileService";
import Error from "../../../components/Error";
import Spinner from "../../../components/Spinner";
import { useQueryClient } from "react-query";
import { router } from "expo-router";
import { useMacros, useUpdateMacros } from "./useMacros";
import LoadingScreen from "../../../components/LoadingScreen";
import { useProfile } from "./useProfile";

export default function EditMacros() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMacrosFormData>();

  const queryClient = useQueryClient();

  const { user, isLoading: isLoadingProfile } = useProfile();
  const id = user?.id as string;
  const { macros, isLoading: isLoadingMacros } = useMacros(id);
  if (isLoadingProfile || isLoadingMacros) return <LoadingScreen />;
  const { carbs, fat, kcal, protein } = macros?.at(0)?.macros;

  const { updateMacros } = useUpdateMacros();

  const onSubmit: SubmitHandler<EditMacrosFormData> = (formData) => {
    const data = { ...formData, id };
    updateMacros(data);
    router.back();
  };

  return (
    <KeyboardProvider>
      <KeyboardProvider.CustomKeyboardAvoidingView>
        <KeyboardProvider.HideKeyboard>
          <SafeAreaView>
            <View>
              <NavigationHeader label="Makroskładniki" />

              <View className="h-full">
                <ScrollView>
                  <View className="m-5">
                    <Controller
                      name="kcal"
                      control={control}
                      rules={{
                        required: "Należy podać ilość",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Kalorie"
                          inputMode="numeric"
                          placeholder={String(kcal)}
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.kcal && <Error>{errors.kcal.message}</Error>}

                    <Controller
                      name="protein"
                      control={control}
                      rules={{
                        required: "Należy podać ilość",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Biało"
                          inputMode="numeric"
                          placeholder={String(protein)}
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.protein && <Error>{errors.protein.message}</Error>}

                    <Controller
                      name="fat"
                      control={control}
                      rules={{
                        required: "Należy podać ilość",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Tłuszcze"
                          inputMode="numeric"
                          placeholder={String(fat)}
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.fat && <Error>{errors.fat.message}</Error>}

                    <Controller
                      name="carbs"
                      control={control}
                      rules={{
                        required: "Należy podać ilość",
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Węglowodany"
                          inputMode="numeric"
                          placeholder={String(carbs)}
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.carbs && <Error>{errors.carbs.message}</Error>}
                  </View>

                  <View className="flex items-center justify-center">
                    <TouchableOpacity
                      onPress={handleSubmit(onSubmit)}
                      disabled={false}
                      className="flex h-[60px] w-2/5 items-center justify-center rounded-full bg-orange-400 py-4 shadow-lg"
                    >
                      <Text className="text-center text-lg text-white">
                        {false ? <Spinner color="#fff" /> : "Zapisz"}
                      </Text>
                    </TouchableOpacity>
                  </View>
                </ScrollView>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
}
