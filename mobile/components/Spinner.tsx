import React from "react";
import { View, Animated } from "react-native";
import * as Animatable from "react-native-animatable";

const Spinner = ({ color = `#FB923C` }: { color?: string }) => {
  const delay = 75;

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Animatable.View
        animation="bounce"
        duration={1200}
        iterationCount="infinite"
        delay={delay}
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
          marginHorizontal: 2,
        }}
      />
      <Animatable.View
        animation="bounce"
        duration={1200}
        iterationCount="infinite"
        delay={delay * 2}
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
          marginHorizontal: 2,
        }}
      />
      <Animatable.View
        animation="bounce"
        duration={1200}
        iterationCount="infinite"
        delay={delay * 3}
        style={{
          width: 12,
          height: 12,
          borderRadius: 6,
          backgroundColor: color,
          marginHorizontal: 2,
        }}
      />
    </View>
  );
};

export default Spinner;
