import { Link } from "expo-router";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import FoodListItem from "../components/FoodListItem";

const foodItems = [
  {
    food: {
      label: "pizza",
      nutrients: { ENERC_KCAL: 275 },
      brand: "domino",
    },
  },
  {
    food: {
      label: "chocolate",
      nutrients: { ENERC_KCAL: 155 },
      brand: "wonka",
    },
  },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Calories</Text>
        <Text>1770 - 360 = 1430</Text>
      </View>

      <View style={styles.headerRow}>
        <Text style={styles.subtitle}>Today's food</Text>
        <Link href={"/search"}>
          <Button title="ADD FOOD" />
        </Link>
      </View>
      <FlatList
        data={foodItems}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FoodListItem item={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
    padding: 10,
    gap: 10,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "500",
    flex: 1,
    color: "dimgray",
  },
});
