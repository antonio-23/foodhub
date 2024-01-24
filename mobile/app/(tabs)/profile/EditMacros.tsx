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

export default function EditMacros() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMacrosFormData>();

  const onSubmit: SubmitHandler<EditMacrosFormData> = (data) => {
    console.log(data);
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
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Kalorie"
                          placeholder="Kalorie (kcal)"
                          inputMode="numeric"
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.kcal && <Error>{errors.kcal.message}</Error>}

                    <Controller
                      name="protein"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Biało"
                          placeholder="Białko"
                          inputMode="numeric"
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.protein && <Error>{errors.protein.message}</Error>}

                    <Controller
                      name="fat"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Tłuszcze"
                          placeholder="Tłuszcze"
                          inputMode="numeric"
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.fat && <Error>{errors.fat.message}</Error>}

                    <Controller
                      name="carb"
                      control={control}
                      rules={{
                        pattern: {
                          value: /^[0-9]+$/,
                          message: "Wprowadź poprawną liczbę",
                        },
                      }}
                      render={({ field }) => (
                        <Input
                          label="Węglowodany"
                          placeholder="Węglowodany"
                          inputMode="numeric"
                          action={(value) => field.onChange(value)}
                        />
                      )}
                    />
                    {errors.carb && <Error>{errors.carb.message}</Error>}
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
