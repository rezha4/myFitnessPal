import { View } from "react-native";
import { Slot, Stack } from "expo-router";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  gql,
} from "@apollo/client";

const client = new ApolloClient({
  uri: "https://tamahu.stepzen.net/api/musty-bear/__graphql",
  cache: new InMemoryCache(),
  headers: {
    Authorization:
      "apikey tamahu::stepzen.io+1000::9644c134d2d0384f365812ea41ed2f17b51e2a05724301b4ed8e7f2e34b42d7b",
  },
});

const RootLayout = () => {
  return (
    <ApolloProvider client={client}>
      <Stack />
    </ApolloProvider>
  );
};

export default RootLayout;
