import {
  View,
  Text,
  ScrollView,
  Platform,
  TouchableOpacity,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import React, { useState } from "react";
import Loading from "../components/Loading";
import Card from "../components/Card";
import { BEARER_TOKEN } from "../constants/index";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization: "Bearer " + BEARER_TOKEN,
  },
};

export default function HomeScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [movies, setMovies] = useState([]);

  React.useEffect(() => {
    setLoading(true);
    fetch(
      "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
      options
    )
      .then((response) => response.json())
      .then((response) => {
        setMovies(response.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <View className="flex-1 bg-gray-900">
      {/* search bar */}
      <SafeAreaView>
        <View className="flex-row justify-between items-center mt-2 px-4">
          <Text className="text-white text-2xl font-bold">Popular Movies</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Search")}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="white" />
          </TouchableOpacity>
        </View>
      </SafeAreaView>

      {loading ? (
        <Loading />
      ) : (
        <ScrollView
          contentContainerStyle={{
            paddingBottom: 10,
            justifyContent: "center",
            flexDirection: "row",
            flexWrap: "wrap",
            alignItems: "center",
            gap: 20,
          }}
          className="mt-4"
        >
          {movies.map((item, index) => (
            <Card key={index} item={item} />
          ))}
        </ScrollView>
      )}
    </View>
  );
}
