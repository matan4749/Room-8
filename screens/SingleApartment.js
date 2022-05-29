import React, { useEffect, useState } from "react";
import { Text, View, Image } from "react-native";
import tw from "tailwind-rn";
function SingleApartment({ route }) {
  const apartment = route.params.apartment;
  console.log({ apartment });

  return (
    <View>
      <Text>פרטים נוספים</Text>
      {apartment && (
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <Image
            source={{ uri: apartment.photoURL }}
            style={{ height: 200, width: 200 }}
          />

          <View>
            <Text style={tw("text-center text-black text-xl")}>
              כתובת:{apartment.Address}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מספר חדרים:{apartment.Rooms}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              שכירות:{apartment.Rent}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מספר שותפים:{apartment.NumberOfPartners}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              שומרים שבת:{apartment.Sabbath ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              סטודנטים:{apartment.isstudent ? "✅" : "❎"}
            </Text>
            <Text style={tw("text-center text-black text-xl")}>
              מעשנים:{apartment.isSmokers ? "✅" : "❎"}
            </Text>
          </View>
        </View>
      )}
    </View>
  );
}

export default SingleApartment;
