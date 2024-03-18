import { View, Text,  } from "react-native";
import { AntDesign } from "@expo/vector-icons";
import { gql, useMutation } from "@apollo/client";
import { useRouter } from "expo-router";

const mutation = gql`
  mutation foodLogsForDate(
    $food_id: String!
    $kcal: Int!
    $label: String!
    $user_id: String!
  ) {
    insertFood_log(
      food_id: $food_id
      user_id: $user_id
      label: $label
      kcal: $kcal
    ) {
      user_id
      label
      kcal
      id
      food_id
      created_at
    }
  }
`;

const FoodListItem = ({ item }) => {
  const [logFood, { data, loading, error }] = useMutation(mutation, {
    refetchQueries: ["foodLogsForDate"],
  });
  const router = useRouter();

  const onPlusPressed = async () => {
    await logFood({
      variables: {
        food_id: item.food.foodId,
        kcal: item.food.nutrients.ENERC_KCAL,
        user_id: "rzha",
        label: item.food.label,
      },
    });
    router.back();
  };

  return (
    <View
      style={{
        backgroundColor: "#f6f6f8",
        padding: 10,
        borderRadius: 10,
        gap: 5,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: "bold", fontSize: 16 }}>
          {item.food.label}
        </Text>
        <Text style={{ color: "dimgray" }}>
          {item.food.nutrients.ENERC_KCAL} cal, {item.food.brand}
        </Text>
      </View>
      <AntDesign
        onPress={onPlusPressed}
        name="pluscircleo"
        size={24}
        color="royalblue"
      />
    </View>
  );
};

export default FoodListItem;