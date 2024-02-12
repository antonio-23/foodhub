import {
  View,
  Text,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import NavigationHeader from "../../../components/NavigationHeader";
import Input from "../../../components/Input";
import DropDownPicker from "react-native-dropdown-picker";
import { useProfile } from "./useProfile";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EditMeasurementsFormData } from "../../../services/profileService";
import Error from "../../../components/Error";
import Spinner from "../../../components/Spinner";
import { useActivity, useUpdateActivity } from "./useActivity";
import LoadingScreen from "../../../components/LoadingScreen";
import { router } from "expo-router";

interface Item {
  label: string;
  value: string;
}

export default function EditMeasurements() {
  const [open, setOpen] = useState<boolean>(false);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState<Item[]>([
    { label: "Bardzo niski", value: "VERY_LOW" },
    { label: "Niski", value: "LOW" },
    { label: "Średni", value: "MEDIUM" },
    { label: "Wysoki", value: "HIGH" },
  ]);

  const { user, isLoading } = useProfile();
  const id = user?.id as string;
  const { activity, isLoadingActivity } = useActivity(id);
  const { updateActivity, isUpdating } = useUpdateActivity();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<EditMeasurementsFormData>();

  const { actual_weight, height, physical_activity, weight_goal } =
    activity?.at(0) || {};

  const onSubmit: SubmitHandler<EditMeasurementsFormData> = (data) => {
    updateActivity({ ...data, id });
    router.back();
  };

  if (isLoadingActivity || isLoading) return <LoadingScreen />;

  return (
    <SafeAreaView>
      <View className="h-full">
        <NavigationHeader label="Parametry fizyczne" />

        <ScrollView>
          <View>
            <View className="m-5">
              <Controller
                name="height"
                control={control}
                rules={{
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Wprowadź poprawną liczbę",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Wzrost"
                    placeholder={String(height)}
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
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Wprowadź poprawną liczbę",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Masa ciała aktualna"
                    placeholder={String(actual_weight)}
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
                  pattern: {
                    value: /^[0-9]+$/,
                    message: "Wprowadź poprawną liczbę",
                  },
                }}
                render={({ field }) => (
                  <Input
                    label="Masa ciała docelowa"
                    placeholder={String(weight_goal)}
                    inputMode="numeric"
                    action={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.weightGoal && <Error>{errors.weightGoal.message}</Error>}

              <View>
                <Text className="py-1 text-sm text-gray-500">
                  Wybierz aktywność fizyczną
                </Text>

                <Controller
                  name="physicalActivity"
                  control={control}
                  render={({ field }) => (
                    <DropDownPicker
                      placeholder={String(physical_activity)}
                      placeholderStyle={{
                        color: "#6b7280",
                        fontSize: 14,
                      }}
                      style={{
                        backgroundColor: "#F9FAFB",
                        borderColor: "#f97316",
                      }}
                      dropDownContainerStyle={{
                        backgroundColor: "#F9FAFB",
                        borderColor: "#f97316",
                      }}
                      open={open}
                      value={value}
                      items={items}
                      setOpen={setOpen}
                      setValue={setValue}
                      setItems={setItems}
                      onChangeValue={(value) => field.onChange(value)}
                      zIndexInverse={5000}
                    />
                  )}
                />
                {errors.physicalActivity && (
                  <Error>{errors.physicalActivity.message}</Error>
                )}
              </View>
            </View>

            <View className="-z-50 mt-5 flex items-center justify-center">
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
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
