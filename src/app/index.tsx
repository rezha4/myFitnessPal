import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import FoodListItem from "../components/FoodListItem";

export default function App() {
  return (
    <View style={styles.container}>
      {/* Food item view */}
      <FoodListItem
        item={{ label: "Pizza", cal: 460, brand: "Dominos" }}
      />
      <FoodListItem
        item={{ label: "Soto", cal: 660, brand: "Cak Imini" }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "center",
    padding: 10,
    gap: 5,
  },
});
