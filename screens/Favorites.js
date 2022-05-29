import React from "react";
import { FlatList, Image, Text, View } from "react-native";
import useAuth from "../hooks/useAuth";

function Favorites() {
  const { user } = useAuth();
  console.log({ user });
  return (
    <View>
      <Text>Favorites</Text>
      <FlatList
        data={user.favs || []}
        renderItem={({ item }) => {
          console.log({ item });
          return (
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image
                source={item.photoURL}
                style={{ height: 100, width: 100 }}
              />
              <View>
                <Text> address:{item.Address}</Text>
                <Text> rooms:{item.Rooms}</Text>
                <Text> rent:{item.Rent}</Text>
                <Text> animals:{item.isAnimals ? "yes" : "no"}</Text>
              </View>
            </View>
          );
        }}
      ></FlatList>
    </View>
  );
}

export default Favorites;
