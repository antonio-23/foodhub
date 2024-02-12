import React from "react";
import { Text, TouchableOpacity, View, Alert, ScrollView } from "react-native";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../components/BackButton";
import Input from "../components/Input";
import Bubbles from "../components/Bubbles";
import { AuthCredentials, logIn } from "../services/authAPI";
import { Stack, router } from "expo-router";
import { useMutation } from "react-query";
import Spinner from "../components/Spinner";
import KeyboardProvider from "../components/Keyboard";
import Error from "../components/Error";

interface FormData {
  email: string;
  password: string;
}

const LoginScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const {
    mutate: handleLogIn,
    data,
    isLoading,
    isError,
    error,
  } = useMutation({
    mutationFn: async (credentials: AuthCredentials) => {
      return await logIn(credentials);
    },
    onSuccess: () => router.push("/(tabs)/home/Home"),
    onError: () => Alert.alert("Podano błędne dane."),
  });

  const onSubmit: SubmitHandler<FormData> = async (formData) => {
    const { email, password } = formData;

    !isError
      ? handleLogIn({ email, password })
      : Alert.alert("Podano błędne dane");
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
                    Logowanie
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

                  <Controller
                    name="password"
                    control={control}
                    rules={{
                      required: "Podanie hasła jest wymagane",
                      minLength: {
                        value: 6,
                        message:
                          "Hasło musi składać się z conajmniej 6 znaków!",
                      },
                    }}
                    render={({ field }) => (
                      <Input
                        label="Hasło"
                        placeholder="Podaj hasło"
                        autoCapitalize="none"
                        secureTextEntry={true}
                        action={(text) => {
                          field.onChange(text);
                        }}
                      />
                    )}
                  />
                  {errors.password && <Error>{errors.password.message}</Error>}
                </View>

                <TouchableOpacity
                  className=" flex h-[60px] items-center justify-center rounded-full bg-orange-400 px-16 py-4 shadow-lg"
                  onPress={handleSubmit(onSubmit)}
                >
                  <Text className="text-center text-lg text-white">
                    {isLoading ? <Spinner color="#fff" /> : "Logowanie"}
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => router.push("/ForgottenPassword")}
                  className="flex justify-center pb-10 pt-4"
                >
                  <Text className="text-center text-sm text-gray-500">
                    Nie pamiętasz hasła?
                  </Text>
                </TouchableOpacity>

                <Bubbles />
              </View>
            </SafeAreaView>
          </ScrollView>
        </KeyboardProvider.HideKeyboard>
      </KeyboardProvider.CustomKeyboardAvoidingView>
    </KeyboardProvider>
  );
};

export default LoginScreen;
