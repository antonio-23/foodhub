import { View, Text, Platform } from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import ProgressBar from "../components/ProgressBar";
import Input from "../components/Input";
import { TouchableOpacity } from "react-native-gesture-handler";
import { useRegisterStore } from "../store/register/registerStore";
import { Gender } from "../store/register/registerStore.types";
import DateTimePicker from "@react-native-community/datetimepicker";
import { RadioButton } from "../components/RadioButton";
import { convertDateToSupabaseFormat } from "../utils/toSupabaseDateConverter";
import KeyboardProvider from "../components/Keyboard";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Error from "../components/Error";

interface Item {
  id: number;
  name: string;
  value: Gender;
  selected: boolean;
}

interface FormData {
  gender: Gender;
  name: string;
  birthDate: string;
  height: number;
  actualWeight: number;
  weightGoal: number;
}

export default function RegisterThirdStep() {
  const [isSelected, setIsSelected] = useState<Item[]>([
    { id: 1, name: "Meżczyzna", value: Gender.MALE, selected: false },
    { id: 2, name: "Kobieta", value: Gender.FEMALE, selected: false },
  ]);
  const [birthDate, setBirthDate] = useState<Date>(new Date());
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const setUserParameters = useRegisterStore(
    (state) => state.setUserParameters,
  );

  function onClick(item: Item) {
    let updatedState = isSelected.map((selectedItem) => {
      return selectedItem.id === item.id
        ? { ...selectedItem, selected: true }
        : { ...selectedItem, selected: false };
    });
    setIsSelected(updatedState);
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const { gender, birthDate, actualWeight, height, weightGoal } = data;
    setUserParameters(gender, birthDate, actualWeight, height, weightGoal);
    router.push("/tempDashboard");
  };

  return (
    <KeyboardProvider>
      <KeyboardProvider.CustomKeyboardAvoidingView>
        <KeyboardProvider.HideKeyboard>
          <SafeAreaView>
            <Stack.Screen options={{ headerShown: false }} />
            <View className="mx-5 flex h-full flex-col justify-between ">
              <ProgressBar progress={1} />

              <Text className="text-center text-4xl">Wypełnij swoje dane</Text>

              <View>
                <Text className="text-sm text-gray-500">Płeć</Text>

                <View className="flex flex-row justify-evenly">
                  {isSelected.map((item) => (
                    <Controller
                      name="gender"
                      control={control}
                      rules={{ required: "Płeć jest wymagana" }}
                      render={({ field }) => (
                        <RadioButton
                          onPress={() => {
                            onClick(item);
                            field.onChange(item.value);
                          }}
                          selected={item.selected}
                          key={item.id}
                        >
                          {item.name}
                        </RadioButton>
                      )}
                    />
                  ))}
                </View>
                {errors.gender && <Error>{errors.gender.message}</Error>}

                <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
                  <View pointerEvents="none">
                    <Input
                      label="Data urodzenia"
                      inputMode="text"
                      action={setBirthDate}
                      editable={false}
                      value={birthDate.toISOString().slice(0, 10)}
                    />
                  </View>
                  {errors.birthDate && (
                    <Error>{errors.birthDate.message}</Error>
                  )}
                </TouchableOpacity>

                {isDatePickerOpen && (
                  <Controller
                    name="birthDate"
                    control={control}
                    rules={{ required: "Data urodzenia jest wymagana" }}
                    render={({ field }) => (
                      <DateTimePicker
                        value={birthDate}
                        is24Hour={true}
                        locale="pl"
                        mode="date"
                        themeVariant="light"
                        display={Platform.OS === "ios" ? "spinner" : "default"}
                        onChange={(event, selectedDate) => {
                          const currentDate = selectedDate || new Date();
                          setIsDatePickerOpen(false);
                          setBirthDate(currentDate);
                          const supabaseDate =
                            convertDateToSupabaseFormat(currentDate);
                          field.onChange(supabaseDate);
                        }}
                      />
                    )}
                  />
                )}

                <Controller
                  name="height"
                  control={control}
                  rules={{
                    required: "Wzrost jest wymagany",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Wzrost"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.height && <Error>{errors.height.message}</Error>}

                <Controller
                  name="actualWeight"
                  control={control}
                  rules={{
                    required: "Aktualna waga jest wymagany",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Masa ciała aktualna"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.actualWeight && (
                  <Error>{errors.actualWeight.message}</Error>
                )}

                <Controller
                  name="weightGoal"
                  control={control}
                  rules={{
                    required: "Aktualna waga jest wymagany",
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Wprowadź poprawną liczbę",
                    },
                  }}
                  render={({ field }) => (
                    <Input
                      label="Masa ciała docelowa"
                      inputMode="numeric"
                      action={(value) => field.onChange(value)}
                    />
                  )}
                />
                {errors.weightGoal && (
                  <Error>{errors.weightGoal.message}</Error>
                )}
              </View>

              <View className="my-4">
                <TouchableOpacity
                  className="rounded-full bg-orange-400 px-4 py-4 shadow-lg"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-center text-lg text-white ">Dalej</Text>
                </TouchableOpacity>
              </View>
            </View>
          </SafeAreaView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
}
