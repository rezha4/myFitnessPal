import { StatusBar } from 'expo-status-bar';
import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  ActivityIndicator,
} from "react-native";
import { Link } from "expo-router";
import FoodListItem from "../components/FoodListItem";
import { useState } from "react";
import { gql, useQuery, useLazyQuery } from "@apollo/client";
import { Ionicons } from "@expo/vector-icons";

const query = gql`
  query search($ingr: String) {
    search(ingr: $ingr) {
      text
      hints {
        food {
          brand
          nutrients {
            ENERC_KCAL
          }
          label
          foodId
        }
      }
    }
  }
`;

export default function SearchScreen() {
  const [search, setSearch] = useState("");
  const [scannerEnabled, setScannerEnabled] = useState(false);

  const [runSearch, { data, loading, error }] = useLazyQuery(query);

  const performSearch = () => {
    runSearch({ variables: { ingr: search } });
    // setSearch("");
  };

  // if (loading) {
  //   return <ActivityIndicator />
  // }

  if (error) {
    return <Text>Failed to search</Text>;
  }

  if (scannerEnabled) {
    return (
      <View>
        <Text>Scanner Enabled</Text>
        <Ionicons
          name="close"
          size={24}
          color="black"
          style={{ position: "absolute", right: 10, top: 10 }}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
        }}
      >
        <TextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search..."
          style={styles.input}
        />
        <Ionicons
          onPress={() => setScannerEnabled(true)}
          name="barcode-outline"
          size={32}
          color="dimgray"
        />
      </View>
      {search && <Button title="Search" onPress={performSearch} />}

      {loading && <ActivityIndicator />}
      <FlatList
        data={data?.search?.hints || []}
        renderItem={({ item }) => <FoodListItem item={item} />}
        ListEmptyComponent={() => <Text>Search a food</Text>}
        contentContainerStyle={{ gap: 5 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
    gap: 10,
  },
  input: {
    backgroundColor: "#f2f2f2",
    padding: 10,
    borderRadius: 20,
    flex: 1,
  },
});
