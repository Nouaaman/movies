import {
  Text,
  View,
  TouchableWithoutFeedback,
  Dimensions,
  Image,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { IMAGE_URL } from "../constants";

export default function Card({ item }) {
  const { width } = Dimensions.get("window");

  const navigation = useNavigation();
  return (
    <TouchableWithoutFeedback onPress={() => navigation.push("Details", item)}>
      <View className="space-y-1">
        <Image
          source={
            item.poster_path
              ? {
                  uri: IMAGE_URL + item.poster_path,
                }
              : require("../assets/no-image.png")
          }
          className="rounded-3xl"
          style={{
            width: width * 0.4,
            height: width * 0.6,
          }}
        />
        <Text className="text-neutral-300 ml-1">
          {item.title.length > 14
            ? item.title.slice(0, 14) + "..."
            : item.title}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}
