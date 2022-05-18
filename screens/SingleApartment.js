import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
function SingleApartment({ route }) {
  const apartment = route.params.apartment
  console.log({ apartment });

  return (
    <View>
      <Text>MyApratments</Text>
      {apartment && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: apartment.photoURL }}
            style={{ height: 100, width: 100 }}
          />
          <View>
            <Text> כתובת:{apartment.Address}</Text>
            <Text> מספר חדרים:{apartment.Rooms}</Text>
            <Text> שכירות:{apartment.Rent}</Text>
            <Text> מספר שותפים:{apartment.NumberOfPartners ? "✅" : "❎"}</Text>
            <Text>שומרים שבת:{apartment.Sabbath ? "✅" : "❎"}</Text>
            <Text> סטודנטים:{apartment.isstudent ? "✅" : "❎"}</Text>
            <Text> מעשנים:{apartment.isSmokers ? "✅" : "❎"}</Text>
          </View>

        </View>
      )}
    </View>
  );
}

export default SingleApartment;
