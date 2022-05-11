import React, { useState } from "react";
import {
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  CheckBox,
} from "react-native";
import RNPickerSelect from "react-native-picker-select";
import tw from "tailwind-rn";
const FilterScreen = ({ closeModal }) => {
  const [filterBy, setFilterBy] = useState({
    rooms: false,
    isAnimals: false, //  '', yes, no
    isSmokersOpts: false,
    isstudent: false,
    Sabbath: false,
    iskosher: false,
    roomates: false,
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
  const isSmokersOpts = [
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
  const studentOpts = [
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
  const sabastOpts = [
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
  // const koserOpts = [
  //   {
  //     label: "all",
  //     value: "",
  //   },
  //   {
  //     label: "yes",
  //     value: "yes",
  //   },
  //   {
  //     label: "no",
  //     value: "no",
  //   },
  // ];

  return (
    <KeyboardAvoidingView style={styles.container} behavior="padding">
      <TouchableOpacity
        onPress={() => closeModal(filterBy)}
        style={[
          tw("bg-white absolute bottom-5 w-52 rounded-2xl p-4"),
          { marginHorizontal: "25%" },
        ]}
      >
        <Text style={tw("text-justify text-xl text-gray-500 p-2 font-bold")}>
          בצע סינון
        </Text>
      </TouchableOpacity>
      <View>
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          בעלי חיים
        </Text>
        <RNPickerSelect
          style={pickerStyle}
          onValueChange={(value) =>
            setFilterBy({ ...filterBy, isAnimals: value })
          }
          items={isAnimalsOpts}
        />
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          מספר חדרים
        </Text>

        <RNPickerSelect
          onValueChange={(value) => setFilterBy({ ...filterBy, Rooms: value })}
          items={roomsOpts}
        />
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          מעשנים
        </Text>

        <RNPickerSelect
          onValueChange={(value) =>
            setFilterBy({ ...filterBy, isSmokers: value })
          }
          items={isSmokersOpts}
        />
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          סטודנטים
        </Text>

        <RNPickerSelect
          onValueChange={(value) =>
            setFilterBy({ ...filterBy, isstudent: value })
          }
          items={studentOpts}
        />
        <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
          שומרים שבת
        </Text>

        <RNPickerSelect
          onValueChange={(value) =>
            setFilterBy({ ...filterBy, Sabbath: value })
          }
          items={sabastOpts}
        />
      </View>

      {/* <Text>is iskosher</Text> */}

      {/* <RNPickerSelect
        onValueChange={(value) =>
          setFilterBy({ ...filterBy, iskosher: value })}
        items={koserOpts}
      /> */}
      {/* <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterBy.isAnimals}
            onValueChange={() =>
              setFilterBy({ ...filterBy, isAnimals: !filterBy.isAnimals })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>בעלי חיים בדירה</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterBy.isSmokers}
            onValueChange={() =>
              setFilterBy({ ...filterBy, isSmokers: !filterBy.isSmokers })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>מעשנים בדירה</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterBy.isstudent}
            onValueChange={() =>
              setFilterBy({ ...filterBy, isstudent: !filterBy.isstudent })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>סטודנטים</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterBy.Sabbath}
            onValueChange={() =>
              setFilterBy({ ...filterBy, Sabbath: !filterBy.Sabbath })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>שומרים שבת</Text>
        </View>
      </View>
      <View style={styles.container}>
        <View style={styles.checkboxContainer}>
          <CheckBox
            value={filterBy.iskosher}
            onValueChange={() =>
              setFilterBy({ ...filterBy, iskosher: !filterBy.iskosher })}
            style={styles.checkbox}
          />
          <Text style={styles.label}>כשר</Text>
        </View>
      </View> */}

      {/* <CheckBox
          value={filterBy.isAnimals}
          onValueChange={() =>
            setFilterBy({ ...filterBy, isAnimals: !filterBy.isAnimals })
          }
        /> */}
    </KeyboardAvoidingView>
  );
};

export default FilterScreen;
const pickerStyle = {
  inputIOS: {
    color: "white",
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
  placeholder: {
    color: "white",
  },
  inputAndroid: {
    color: "white",
    paddingHorizontal: 10,
    backgroundColor: "red",
    borderRadius: 5,
  },
};

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
