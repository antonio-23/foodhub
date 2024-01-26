import { Text, TouchableOpacity, View } from "react-native";
import { useState } from "react";
import { router } from "expo-router";
import { useMutation, useQueryClient } from "react-query";
import { addMeal } from "../../../services/mealsAPI";
import { convertDateToSupabaseFormat } from "../../../utils/toSupabaseDateConverter";
import NavigationHeader from "../../../components/NavigationHeader";
import Input from "../../../components/Input";
import Spinner from "../../../components/Spinner";
import { ScrollView } from "react-native";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import Error from "../../../components/Error";

interface FormData {
  name: string;
  kcal: number;
  fats: number;
  carbs: number;
  proteins: number;
}

export default function NewMeal({
  setAddingNewMeal,
  addingNewMeal,
}: {
  setAddingNewMeal: React.Dispatch<React.SetStateAction<boolean>>;
  addingNewMeal: boolean;
}) {
  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const queryClient = useQueryClient();
  const userId = queryClient.getQueryData(["currentUserId"]);
  const mealData = queryClient.getQueryData<string[]>(["currentMeal"]) || [
    "",
    "",
  ];
  const [mealType, title] = mealData;

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const { mutate, isLoading } = useMutation({
    mutationFn: addMeal,
    onSuccess: () => {
      setAddingNewMeal(false);
      queryClient.invalidateQueries(["mealsDetails"]);
      router.back();
    },
  });

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const newMeal = {
      dataOfMeal: {
        ...data,
        userId,
        date: convertDateToSupabaseFormat(new Date()),
      },
      mealType,
    };

    mutate(newMeal);
  };

  return (
    <View className="flex h-full flex-1">
      <NavigationHeader label="Dodaj posiłek" />

      <ScrollView>
        <View className="m-5">
          <Controller
            name="name"
            control={control}
            rules={{ required: "Podanie nazwy posiłku jest wymagane." }}
            render={({ field }) => (
              <Input
                label="Nazwa"
                placeholder="Nazwa"
                inputMode="text"
                action={(text) => field.onChange(text)}
              />
            )}
          />
          {errors.name && <Error>{errors.name.message}</Error>}

          <Controller
            name="kcal"
            control={control}
            rules={{
              required: "Podanie liczby kalori jest wymagane.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Wprowadź poprawną liczbę.",
              },
            }}
            render={({ field }) => (
              <Input
                label="Wartość energetyczna"
                placeholder="Wartość energetyczna (kcal)"
                inputMode="numeric"
                action={(text) => field.onChange(text)}
              />
            )}
          />
          {errors.kcal && <Error>{errors.kcal.message}</Error>}

          <Controller
            name="fats"
            control={control}
            rules={{
              required: "Podanie liczby tłuszczów jest wymagane.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Wprowadź poprawną liczbę.",
              },
            }}
            render={({ field }) => (
              <Input
                label="Tłuszcze"
                placeholder="Tłuszcze (g)"
                inputMode="numeric"
                action={(text) => field.onChange(text)}
              />
            )}
          />
          {errors.fats && <Error>{errors.fats.message}</Error>}

          <Controller
            name="carbs"
            control={control}
            rules={{
              required: "Podanie liczby węglowodanów jest wymagana.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Wprowadź poprawną liczbę.",
              },
            }}
            render={({ field }) => (
              <Input
                label="Węglowodany"
                placeholder="Węglowodany (g)"
                inputMode="numeric"
                action={(text) => field.onChange(text)}
              />
            )}
          />
          {errors.carbs && <Error>{errors.carbs.message}</Error>}

          <Controller
            name="proteins"
            control={control}
            rules={{
              required: "Podanie liczby białka jest wymagana.",
              pattern: {
                value: /^[0-9]+$/,
                message: "Wprowadź poprawną liczbę.",
              },
            }}
            render={({ field }) => (
              <Input
                label="Białko"
                placeholder="Białko (g)"
                inputMode="numeric"
                action={(text) => field.onChange(text)}
              />
            )}
          />
          {errors.proteins && <Error>{errors.proteins.message}</Error>}
        </View>

        <View className="flex flex-row items-center justify-evenly">
          <TouchableOpacity
            onPress={handleSubmit(onSubmit)}
            className="flex h-[60px] w-2/5 items-center justify-center rounded-full bg-orange-400 py-4 shadow-lg"
          >
            <Text className="text-center text-lg text-white">
              {isLoading ? <Spinner color="#fff" /> : "Dodaj"}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}
