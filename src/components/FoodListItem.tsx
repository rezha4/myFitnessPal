import { View, Text,  } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const FoodListItem = ({ item }) => {
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
        <AntDesign name="pluscircleo" size={24} color="royalblue" />
      </View>
    );
  };

export default FoodListItem;