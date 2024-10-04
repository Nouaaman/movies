import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  Image,
  Dimensions,
} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import { ArrowLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";
import Loading from "../components/Loading";
import React from "react";
import { IMAGE_URL } from "../constants";

const { width, height } = Dimensions.get("window");
export default function DetailsScreen() {
  const { params: item } = useRoute();

  const navigation = useNavigation();
  return (
    <View
      contentContainerStyle={{ paddingBottom: 20 }}
      className="flex-1 bg-gray-900"
    >
      {/* back button and item poster */}
      <View className="w-full ">
        <TouchableOpacity
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
          className="absolute top-4 left-4 z-20 rounded-2xl p-2"
          onPress={() => navigation.goBack()}
        >
          <ChevronLeftIcon size="28" strokeWidth={3} color="white" />
        </TouchableOpacity>

        <View>
          <Image
            source={
              item.poster_path
                ? {
                    uri: IMAGE_URL + item.poster_path,
                  }
                : require("../assets/no-image.png")
            }
            style={{ width, height: height * 0.7 }}
            className="rounded-b-3xl"
          />
        </View>
      </View>

      {/* item details */}

      <ScrollView className="space-y-2 px-4">
        {/* title */}
        <Text className="text-white text-center text-3xl font-semibold mt-4 tracking-widest">
          {item?.title}
        </Text>

        {/* release date*/}
        {item?.id ? (
          <Text className="text-neutral-400  text-sm text-center font-light">
            Release date • {item?.release_date || "N/A"}
          </Text>
        ) : null}

        {/* description */}
        <Text className="text-neutral-300 text-justify tracking-wide">
          {item?.overview}
        </Text>
      </ScrollView>
    </View>
  );
}
