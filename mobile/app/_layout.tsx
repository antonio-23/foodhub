import React, { useEffect } from "react";
import { Stack } from "expo-router";
import { QueryClient } from "react-query";
import { QueryClientProvider } from "react-query";
import { BackHandler, StatusBar } from "react-native";
import { getCurrentUser } from "../services/authAPI";

const queryClient = new QueryClient();

const Layout = () => {
  useEffect(() => {
    getCurrentUser();
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <StatusBar barStyle="dark-content" />
      <Stack initialRouteName="welcome">
        <Stack.Screen name="welcome" />
        <Stack.Screen name="login" />
        <Stack.Screen name="register" />
        <Stack.Screen name="RegisterFirstStep" />
        <Stack.Screen name="RegisterSecondStep" />
        <Stack.Screen name="RegisterThirdStep" />
        <Stack.Screen name="tempDashboard" />
      </Stack>
    </QueryClientProvider>
  );
};

export default Layout;
