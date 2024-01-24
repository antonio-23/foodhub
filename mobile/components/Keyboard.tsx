import React, { createContext, ReactNode } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
  KeyboardAvoidingView,
} from "react-native";

interface KeyboardContextProps {
  children: ReactNode | null;
}

const KeyboardContext = createContext<KeyboardContextProps>({
  children: null,
});

export function KeyboardProvider({ children }: { children: ReactNode }) {
  return (
    <KeyboardContext.Provider value={{ children }}>
      {children}
    </KeyboardContext.Provider>
  );
}

function HideKeyboard({ children }: { children: ReactNode }) {
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      {children}
    </TouchableWithoutFeedback>
  );
}

function CustomKeyboardAvoidingView({ children }: { children: ReactNode }) {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      {children}
    </KeyboardAvoidingView>
  );
}

KeyboardProvider.HideKeyboard = HideKeyboard;
KeyboardProvider.CustomKeyboardAvoidingView = CustomKeyboardAvoidingView;

export default KeyboardProvider;
