import React, { ReactNode } from "react";
import { Stack, Tabs } from "expo-router";

import { AntDesign } from "@expo/vector-icons";
import { View, Text, Platform, StatusBar } from "react-native";

function TabItem({
  focused,
  name,
  iconActive,
  iconDisabled,
}: {
  focused: boolean;
  name: string;
  iconActive: ReactNode;
  iconDisabled: ReactNode;
}) {
  return (
    <View className="flex flex-col items-center justify-center">
      {
        <>
          {focused ? (
            <>
              {Platform.OS === "ios" ? (
                <View className="absolute -top-[8px] h-[3px] w-14 flex-col rounded-full bg-white" />
              ) : (
                <View className="absolute -top-[20px] my-1 h-[3px] w-14 flex-col  rounded-full bg-white" />
              )}

              <View className="flex flex-col items-center gap-1">
                {iconActive}
                <Text className="text-white">{name}</Text>
              </View>
            </>
          ) : (
            <View className="flex flex-col items-center justify-center gap-1">
              {iconDisabled}
              <Text className="text-white/60">{name}</Text>
            </View>
          )}
        </>
      }
    </View>
  );
}

export default function TabsLayout() {
  return (
    <>
      <StatusBar barStyle="default" />
      <Stack.Screen options={{ headerShown: false }} />
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            backgroundColor: "#f97316",
            height: Platform.OS === "ios" ? 90 : 80,
            borderTopLeftRadius: 34,
            borderTopRightRadius: 34,
            paddingHorizontal: 15,
            shadowColor: "#9CA3AF",
            shadowOffset: { width: 0, height: -5 },
            shadowOpacity: 0.3,
          },
          tabBarLabelStyle: {
            fontSize: 14,
            color: "#fff",
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TabItem
                name="Mój plan"
                iconActive={<AntDesign name="home" size={24} color="#fff" />}
                iconDisabled={
                  <AntDesign
                    name="home"
                    size={24}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                }
                focused={focused}
              />
            ),
          }}
        />

        <Tabs.Screen
          name="recipes"
          options={{
            tabBarLabel: "Przepisy",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TabItem
                name="Przepisy"
                iconActive={<AntDesign name="book" size={24} color="#fff" />}
                iconDisabled={
                  <AntDesign
                    name="book"
                    size={24}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="stats"
          options={{
            tabBarLabel: "Statystyki",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TabItem
                name="Statystyki"
                iconActive={
                  <AntDesign name="barschart" size={24} color="#fff" />
                }
                iconDisabled={
                  <AntDesign
                    name="barschart"
                    size={24}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            tabBarLabel: "Profil",
            tabBarShowLabel: false,
            tabBarIcon: ({ focused }) => (
              <TabItem
                name="Profil"
                iconActive={<AntDesign name="user" size={24} color="#fff" />}
                iconDisabled={
                  <AntDesign
                    name="user"
                    size={24}
                    color="rgba(255, 255, 255, 0.6)"
                  />
                }
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
}
