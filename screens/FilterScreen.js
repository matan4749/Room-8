import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
const FilterScreen = ({ closeModal }) => {
  const [filterBy, setFilterBy] = useState({
    rooms: "",
    isAnimals: "", //  '', yes, no
    roomates: "",
  });
  const roomsOpts = [
    {
      label: "all",
      value: "",
    },
    {
      label: 1,
      value: 1,
    },
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
    {
      label: 4,
      value: 4,
    },
  ];
  const isAnimalsOpts = [
    {
      label: "all",
      value: "",
    },
    {
      label: "yes",
      value: "yes",
    },
    {
      label: "no",
      value: "no",
    },
  ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        style={{ backgroundColor: "green", height: 20, width: 100 }}
        onPress={() => closeModal(filterBy)}
      >
        <Text>X</Text>
      </TouchableOpacity>
      <View>
        <RNPickerSelect
          items={roomsOpts}
          onValueChange={(value) => setFilterBy({ ...filterBy, rooms: value })}
        />
        <RNPickerSelect
          items={isAnimalsOpts}
          onValueChange={(value) =>
            setFilterBy({ ...filterBy, isAnimals: value })
          }
        />

        {/* <CheckBox
          value={filterBy.isAnimals}
          onValueChange={() =>
            setFilterBy({ ...filterBy, isAnimals: !filterBy.isAnimals })
          }
        /> */}
      </View>
    </KeyboardAvoidingView>
  );
};

export default FilterScreen;

const styles = StyleSheet.create({
  opt: {
    borderWidth: 1,
    borderColor: "black",
    height: 20,
    marginBottom: 10,
    width: 100,
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  inputContainer: {
    width: "80%",
  },
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 5,
  },
  buttonContainer: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  button: {
    backgroundColor: "#0782F9",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  buttonOutline: {
    backgroundColor: "white",
    marginTop: 5,
    borderColor: "#0782F9",
    //borderWidth:'2'
  },
  buttonText: {
    color: "white",
    fontWeight: "700",
    fontSize: 16,
  },
  buttonOutlineText: {
    color: "#0782F9",
    fontWeight: "700",
    fontSize: 16,
  },
});
