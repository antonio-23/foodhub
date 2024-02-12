import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Platform,
  SafeAreaView,
  ScrollView,
} from "react-native";
import React, { useState } from "react";
import NavigationHeader from "../../../components/NavigationHeader";
import Input from "../../../components/Input";
import DateTimePicker from "@react-native-community/datetimepicker";
import KeyboardProvider from "../../../components/Keyboard";
import { useProfile } from "./useProfile";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import { EditProfileFormData } from "../../../services/profileService";
import Error from "../../../components/Error";
import { useUpdateProfile } from "./useUpdateProfile";
import Spinner from "../../../components/Spinner";
import { ImagePickerAsset } from "expo-image-picker";
import { pickImage } from "../../../utils/pickImage";
import { convertDateToSupabaseFormat } from "../../../utils/toSupabaseDateConverter";

export default function EditProfile() {
  const [isDatePickerOpen, setIsDatePickerOpen] = useState<boolean>(false);
  const [birthDate, setBirthDate] = useState<Date | null>(null);
  const [image, setImage] = useState<ImagePickerAsset | null>(null);

  const { user } = useProfile();
  const { name: nameFromDb, birthDate: birthDateFromDb } = user?.user_metadata!;
  const macros = user?.user_metadata.macros;
  const { email: emailFromDb } = user!;

  const { isLoading, updateProfile } = useUpdateProfile();

  const {
    control,
    handleSubmit,
    getValues,
    reset,
    formState: { errors },
  } = useForm<EditProfileFormData>();

  const onSubmit: SubmitHandler<EditProfileFormData> = async (data) => {
    const updatedData = {
      ...data,
      macros: macros,
    };
    updateProfile({ updatedData });
  };

  return (
    <KeyboardProvider>
      <KeyboardProvider.CustomKeyboardAvoidingView>
        <KeyboardProvider.HideKeyboard>
          <SafeAreaView>
            <View className="h-full">
              <NavigationHeader label="Edycja" />

              <ScrollView>
                <View className="flex items-center">
                  <View className="flex h-28 w-28 items-center rounded-full border-4 border-gray-200 ">
                    {image && (
                      <Image
                        source={{ uri: image.uri }}
                        style={{
                          flex: 1,
                          width: "100%",
                          height: "100%",
                          resizeMode: "cover",
                          borderRadius: 56,
                        }}
                      />
                    )}
                  </View>

                  <TouchableOpacity onPress={() => pickImage(setImage)}>
                    <Text className="mb-5 mt-3 text-base text-orange-500">
                      Zmień zdjęcie
                    </Text>
                  </TouchableOpacity>
                </View>

                <View className="mx-5">
                  <Controller
                    name="name"
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Imię i nazwisko"
                        inputMode="text"
                        placeholder={nameFromDb}
                        editable={true}
                        action={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.name && <Error>{errors.name.message}</Error>}

                  <Input
                    label="E-mail"
                    inputMode="email"
                    placeholder="E-mail"
                    editable={false}
                    selectTextOnFocus={true}
                    value={emailFromDb}
                  />

                  <TouchableOpacity onPress={() => setIsDatePickerOpen(true)}>
                    <View pointerEvents="none">
                      <Input
                        label="Data urodzenia"
                        value={
                          birthDate
                            ? birthDate.toISOString().slice(0, 10)
                            : birthDateFromDb.slice(0, 10)
                        }
                        inputMode="text"
                      />

                      {errors.birthDate && (
                        <Error>{errors.birthDate.message}</Error>
                      )}
                    </View>
                  </TouchableOpacity>

                  {isDatePickerOpen && (
                    <Controller
                      name="birthDate"
                      control={control}
                      render={({ field }) => (
                        <DateTimePicker
                          testID="dateTimePicker"
                          value={birthDate || new Date()}
                          is24Hour={true}
                          locale="pl"
                          mode="date"
                          themeVariant="light"
                          display={
                            Platform.OS === "ios" ? "spinner" : "default"
                          }
                          onChange={(event, selectedDate) => {
                            const currentDate = selectedDate || new Date();
                            setIsDatePickerOpen(false);
                            setBirthDate(
                              new Date(
                                convertDateToSupabaseFormat(currentDate),
                              ),
                            );
                            setBirthDate(currentDate);
                            field.onChange(
                              convertDateToSupabaseFormat(currentDate),
                            );
                          }}
                        />
                      )}
                    />
                  )}

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      minLength: {
                        value: 6,
                        message: "Hasło musi mieć co najmniej 6 znaków",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        label="Nowe hasło"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder="Nowe hasło"
                        action={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}

                  <Controller
                    name="passwordConfirm"
                    control={control}
                    rules={{
                      validate: (value) =>
                        getValues().password === value ||
                        "Hasło musi być takie samo.",
                    }}
                    render={({ field }) => (
                      <Input
                        label="Powtórz nowe hasło"
                        secureTextEntry={true}
                        autoCapitalize="none"
                        placeholder="Powtórz nowe hasło"
                        action={(value) => field.onChange(value)}
                      />
                    )}
                  />
                  {errors.passwordConfirm && (
                    <Error>{errors.passwordConfirm.message}</Error>
                  )}
                </View>

                <View className="flex items-center justify-center">
                  <TouchableOpacity
                    onPress={handleSubmit(onSubmit)}
                    disabled={isLoading}
                    className="flex h-[60px] w-2/5 items-center justify-center rounded-full bg-orange-400 py-4 shadow-lg"
                  >
                    <Text className="text-center text-lg text-white">
                      {isLoading ? <Spinner color="#fff" /> : "Zapisz"}
                    </Text>
                  </TouchableOpacity>
                </View>

                <Image
                  source={{ uri: "data:image/jpeg;base64," + image }}
                  style={{ width: 200, height: 200 }}
                />
              </ScrollView>
            </View>
          </SafeAreaView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
}
