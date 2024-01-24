import { Stack } from "expo-router";
import { SafeAreaView } from "react-native";
import KeyboardProvider from "../../../components/Keyboard";

export default function RecipesLayout() {
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardProvider>
        <KeyboardProvider.CustomKeyboardAvoidingView>
          <KeyboardProvider.HideKeyboard>
            <Stack screenOptions={{ headerShown: false }} />
          </KeyboardProvider.HideKeyboard>
        </KeyboardProvider.CustomKeyboardAvoidingView>
      </KeyboardProvider>
    </SafeAreaView>
  );
}
