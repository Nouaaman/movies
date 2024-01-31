import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useNavigation } from "@react-navigation/native";
import { XMarkIcon } from "react-native-heroicons/outline";
import React, { useEffect, useState } from "react";
import Loading from "../components/Loading";
import { BEARER_TOKEN } from "../constants";
import Card from "../components/Card";

const { width, height } = Dimensions.get("window");
export default function SearchScreen() {
  const navigation = useNavigation();
  const [loading, setLoading] = useState(true);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    setLoading(true);
    fetch(
      `https://api.themoviedb.org/3/search/movie?query=${searchText}&language=en-US&page=1&include_adult=false`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + BEARER_TOKEN,
        },
      }
    )
      .then((response) => response.json())
      .then((response) => {
        setResults(response.results);
        setLoading(false);
      })
      .catch((err) => console.error(err));
  }, [searchText]);
  return (
    <SafeAreaView className="bg-gray-900 flex-1">
      {/* search input */}
      <View className="mx-4 mb-3 mt-2 flex-row justify-between items-center border border-gray-400 rounded-full">
        <TextInput
          onChangeText={setSearchText}
          placeholder="Search Movie"
          placeholderTextColor={"gray"}
          className="pb-1 pl-5 h-full flex-1 text-base font-semibold text-white tracking-wider"
        />
        <TouchableOpacity
          onPress={() => navigation.navigate("Home")}
          className="rounded-full p-3 m-1 bg-gray-500"
        >
          <XMarkIcon size="25" color="white" />
        </TouchableOpacity>
      </View>

      {/* search results */}
      {loading ? (
        <Loading />
      ) : (
        <>
          {results.length > 0 && (
            <Text className="text-neutral-400  text-sm text-center font-light">
              {results.length} results
            </Text>
          )}
          <ScrollView
            contentContainerStyle={{
              paddingBottom: 10,
              justifyContent: "center",
              flexDirection: "row",
              flexWrap: "wrap",
              alignItems: "center",
              gap: 20,
            }}
            className="mt-2"
          >
            {results.length ? (
              results.map((item, index) => <Card key={index} item={item} />)
            ) : (
              <Text className="text-white text-center text-2xl">
                No results
              </Text>
            )}
          </ScrollView>
        </>
      )}
    </SafeAreaView>
  );
}
