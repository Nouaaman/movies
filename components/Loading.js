import { View, Text, Dimensions } from "react-native";
import React from "react";
// import * as Progress from "react-native-progress";

const { width, height } = Dimensions.get("window");

export default function Loading() {
  return (
    <View
      style={{ height, width }}
      className="absolute flex-row justify-center items-center "
    >
      <View className="rounded-full w-60 h-60 flex-row justify-center items-center ">
        <Text className="text-white text-2xl font-bold">Loading...</Text>
      </View>
    </View>
  );
}
