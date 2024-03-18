import { Link } from "expo-router";
import {
  ActivityIndicator,
  Button,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { gql, useQuery } from "@apollo/client";
import dayjs from "dayjs";
import FoodLogListItem from "../components/FoodLogListItem";

const query = gql`
  query MyQuery($date: Date!, $user_id: String!) {
    foodLogsForDate(date: $date, user_id: $user_id) {
      id
      food_id
      label
      created_at
      kcal
      user_id
    }
  }
`;

export default function HomeScreen() {
  const user_id = "rzha";

  const { data, loading, error } = useQuery(query, {
    variables: { date: dayjs().format("YYYY-MM-DD"), user_id },
  });

  if (loading) {
    return <ActivityIndicator />;
  }

  if (error) {
    return <Text>Error fetching data</Text>;
  }

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
        data={data.foodLogsForDate}
        contentContainerStyle={{ gap: 5 }}
        renderItem={({ item }) => <FoodLogListItem item={item} />}
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
