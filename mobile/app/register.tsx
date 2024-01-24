import React from "react";
import { Text, View, ScrollView } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import { Stack, router } from "expo-router";
import BackButton from "../components/BackButton";
import { TouchableOpacity } from "react-native-gesture-handler";
import Bubbles from "../components/Bubbles";
import Input from "../components/Input";
import { useRegisterStore } from "../store/register/registerStore";
import KeyboardProvider from "../components/Keyboard";
import Error from "../components/Error";

interface FormData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm<FormData>();

  const setUserCredentials = useRegisterStore(
    (state) => state.setUserCredentials,
  );

  const onSubmit: SubmitHandler<FormData> = (formData) => {
    const { name, email, password, password2 } = formData;

    setUserCredentials(name, email, password);
    router.push("/RegisterFirstStep");
  };

  return (
    <KeyboardProvider>
      <KeyboardProvider.CustomKeyboardAvoidingView>
        <KeyboardProvider.HideKeyboard>
          <ScrollView>
            <SafeAreaView>
              <Stack.Screen options={{ headerShown: false }} />
              <View className="px-5">
                <View className="my-5">
                  <BackButton />
                  <Text className="flex-0 mb-12 mt-8 text-left text-5xl font-medium">
                    Rejestracja
                  </Text>
                </View>

                <View className="flex flex-col items-center justify-center">
                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Imię i nazwisko"
                        placeholder="Podaj imię i nazwisko"
                        inputMode="text"
                        action={(text) => field.onChange(text)}
                      />
                    )}
                    name="name"
                    rules={{ required: "Imię i nazwisko jest wymagane" }}
                  />
                  {errors.name && <Error>{errors.name.message}</Error>}

                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Email"
                        placeholder="Podaj adres e-mail"
                        inputMode="email"
                        autoCapitalize="none"
                        action={(text) => field.onChange(text)}
                      />
                    )}
                    name="email"
                    rules={{
                      required: "Email jest wymagany",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                        message: "Nieprawidłowy adres e-mail",
                      },
                    }}
                  />
                  {errors.email && <Error>{errors.email.message}</Error>}

                  <Controller
                    control={control}
                    render={({ field }) => (
                      <Input
                        label="Hasło"
                        placeholder="Podaj hasło"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        action={(text) => field.onChange(text)}
                      />
                    )}
                    name="password"
                    rules={{
                      required: "Hasło jest wymagane",
                      minLength: {
                        value: 6,
                        message: "Hasło musi mieć co najmniej 6 znaków",
                      },
                    }}
                  />

                  {errors.password && <Error>{errors.password.message}</Error>}

                  <Controller
                    name="password2"
                    control={control}
                    rules={{
                      required: "Potwierdzenie hasła jest wymagane",
                      validate: (value) =>
                        getValues().password === value ||
                        "Hasło musi być takie samo",
                    }}
                    render={({ field }) => (
                      <Input
                        label="Powtórz hasło"
                        placeholder="Podaj ponownie hasło"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        action={(text) => field.onChange(text)}
                      />
                    )}
                  />
                  {errors.password2 && (
                    <Error>{errors.password2.message}</Error>
                  )}
                </View>

                <TouchableOpacity
                  className="flex items-center justify-center rounded-full bg-orange-400 px-16 py-4 shadow-lg"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-center text-lg text-white">
                    Rejestracja
                  </Text>
                </TouchableOpacity>

                <View className="flex flex-row justify-center gap-2 py-4">
                  <Text className="text-center text-sm text-gray-500">
                    Masz konto?
                  </Text>
                  <TouchableOpacity onPress={() => router.push("/login")}>
                    <Text className="text-center text-sm text-orange-400">
                      Logowanie
                    </Text>
                  </TouchableOpacity>
                </View>
                <Bubbles />
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
};

export default RegisterScreen;
