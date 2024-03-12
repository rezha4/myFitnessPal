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
import { gql, useQuery } from "@apollo/client";

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

const foodItems = [
  { label: "Pizza", cal: 700, brand: "Dominos" },
  { label: "Apple", cal: 50, brand: "Generic" },
  { label: "Chocolate", cal: 500, brand: "Delfi" },
  { label: "Coffee", cal: 0, brand: "Kapal Api" },
];

export default function App() {
  const [search, setSearch] = useState("");

  const { data, loading, error } = useQuery(query, {
    variables: { ingr: "pizza" },
  });

  const performSearch = () => {
    console.warn("Searching for:", search);
    setSearch("");
  };

  if (loading) {
    return <ActivityIndicator />
  }

  if (error) {
    return <Text>Failed to search</Text>
  }

  console.log(JSON.stringify(data));

  return (
    <View style={styles.container}>
      <TextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search..."
        style={styles.input}
      />
      {search && <Button title="Search" onPress={performSearch} />}

      <FlatList
        data={data.search.hints}
        renderItem={({ item }) => <FoodListItem item={item} />}
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
  },
});
