import React, { useRef, useState, useEffect, useContext } from "react";
import {
  View,
  Linking,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  SafeAreaView,
  Modal,
} from "react-native";
import Swiper from "react-native-deck-swiper";
import { db } from "../firebase";
import { onSnapshot, collection, getDocs, doc } from "@firebase/firestore";
import useAuth from "../hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import {
  AntDesign,
  Entypo,
  Ionicons,
  FontAwesome,
  MaterialIcons,
  Feather,
} from "@expo/vector-icons";
import tw from "tailwind-rn";
import FilterScreen from "./FilterScreen";
import { AppContext } from "../contexts/appContext";
import { userService } from "../services/userService";
import { apartmentService } from "../services/apartmentService";
const HomeScreen = () => {
  const navigation = useNavigation();
  const { user, logout } = useAuth();
  const [Aprment, setAprment] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const swipeRef = useRef(null);
  const [showFilter, setShowFilter] = useState(false);
  const context = useContext(AppContext);

  useEffect(() => {
    getAprtments();
  }, []);

  const filterItems = (filterBy) => {
    let copy = [...Aprment];
    if (filterBy.Rooms) {
      copy = copy.filter((item) => item.Rooms == filterBy.Rooms);
    }
    if (filterBy.roomates) {
      copy = copy.filter((item) => item.roomates == filterBy.roomates);
    }
    if (filterBy.isAnimals === "yes") {
      copy = copy.filter((item) => item.isAnimals);
    } else if (filterBy.isAnimals === "no") {
      copy = copy.filter((item) => !item.isAnimals);
    }
    if (filterBy.isSmokers === "yes") {
      copy = copy.filter((item) => item.isSmokers);
    } else if (filterBy.isSmokers === "no") {
      copy = copy.filter((item) => !item.isSmokers);
    }
    if (filterBy.Sabbath === "yes") {
      copy = copy.filter((item) => item.Sabbath);
    } else if (filterBy.Sabbath === "no") {
      copy = copy.filter((item) => !item.Sabbath);
    }
    if (filterBy.isstudent === "yes") {
      copy = copy.filter((item) => item.isstudent);
    } else if (filterBy.isstudent === "no") {
      copy = copy.filter((item) => !item.isstudent);
    }
    setFilteredItems(copy);
  };

  async function getAprtments() {
    let docSnap = await getDocs(collection(db, "apartments"));
    let newArr = Aprment;
    docSnap.forEach((doc) => {
      if (user.favs) {
        const found = user.favs.find((fav) => fav.id === doc.id);
        if (!found) newArr.push({ ...doc.data(), id: doc.id });
      } else {
        newArr.push({ ...doc.data(), id: doc.id });
      }
    });
    setAprment(newArr);
    setFilteredItems(newArr);
  }

  const handleNavEdit = () => {
    const apartment = apartmentService.getMyApartment(user);
    if (!apartment) {
      navigation.navigate("MyApratment");
    } else {
      navigation.navigate("addAprment");
    }
  };

  return (
    <SafeAreaView style={tw("flex-1 relative")}>
      <View style={styles.header}>
        {Aprment && (
          <View style={{ position: "relative" }}>
            <TouchableOpacity
              onPress={() => context.toggleMenu(!context.showMenu)}
            >
              <Image
                style={tw("h-10 w-10 rounded-full")}
                source={{ uri: user.photoURL }}
              />
            </TouchableOpacity>
          </View>
        )}
        <TouchableOpacity onPress={() => {
          handleNavEdit();
        }}>
          <MaterialIcons

            name="add-business"
            size={40}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Ionicons
            onPress={() => navigation.navigate("notifications")}
            name="notifications"
            size={40}
            color="##f08080"
          />
        </TouchableOpacity>
      </View>

      <View style={tw("flex-1  -mt-6")}>
        {Aprment && (
          <Swiper
            ref={swipeRef}
            containerStyle={{ backgroundColor: "transparent" }}
            cards={filteredItems}
            overlayLabels={{
              left: {
                title: "לא אהבתי",
                style: {
                  label: {
                    textAlign: "right",
                    color: "red",
                  },
                },
              },
              right: {
                title: "אהבתי",
                style: {
                  label: {
                    color: "#4DED30",
                  },
                },
              },
            }}
            renderCard={(card) => {
              return card ? (
                <View
                  key={card.id}
                  style={[
                    tw("relative bg-white h-3/4 rounded-xl"),
                    styles.cardShadow,
                  ]}
                >
                  <Image
                    style={tw("absolute top-0 h-full w-full rounded-xl ")}
                    source={{
                      uri: card?.photoURL,
                    }}
                  />
                  <View
                    style={tw(
                      "flex-row justify-between items-center absolute bottom-0 flex h-20 w-full text-center px-6 py-2 rounded-b-xl bg-white"
                    )}
                  >
                    <View>
                      <Text>מספר שותפים: {card?.NumberOfPartners}</Text>
                      <Text> בעלי חיים: {card?.isAnimals ? "✅" : "❎"}</Text>
                    </View>

                    <View>
                      <Text> חדרים: {card?.Rooms}</Text>
                      <Text> שבת: {card?.Sabbath ? "✅" : "❎"}</Text>
                    </View>
                    <View>
                      <Text> מעשנים: {card?.isSmokers ? "✅" : "❎"}</Text>
                      <Text> סטודנטים: {card?.isstudent ? "✅" : "❎"}</Text>
                    </View>
                    <Text style={tw("text-xl font-bold")}>{card?.Address}</Text>
                  </View>
                </View>
              ) : (
                <View
                  style={[
                    tw(
                      "relative bg-white h-3/4 rounded-xl justify-center items-center"
                    ),
                    styles.cardShadow,
                  ]}
                >
                  <Text style={tw("font-bold pb-5")}>אין דירות להצגה</Text>

                  <Image
                    style={tw("h-20 w-full")}
                    height={100}
                    width={100}
                    source={{ uri: "https://links.papareact.com/6gb" }}
                  />
                </View>
              );
            }}
            animateCardOpacity
            verticalSwipe={false}
            onSwipedLeft={(cardIndex) => {
              // swipeLeft(cardIndex);
            }}
            onSwipedRight={(cardIndex) => {
              console.log("Swipe MATCH", cardIndex);

              //swipeRight(cardIndex);
              userService.addFav(user, filteredItems[cardIndex]);
            }}
            cardIndex={0}
            backgroundColor={"#4FD0E9"}
            stackSize={5}
          ></Swiper>
        )}
      </View>
      <View style={tw("flex flex-row justify-evenly")}>
        <TouchableOpacity onPress={() => swipeRef.current.swipeLeft()}>
          <Ionicons name="heart-dislike-circle" size={60} color="red" />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowFilter(!showFilter)}>
          <AntDesign name="filter" size={40} color="black" />
        </TouchableOpacity>
        <TouchableOpacity>
          <FontAwesome
            onPress={() =>
              Linking.openURL(`https://wa.me/${card?.PhoneNumber}`)
            }
            name="whatsapp"
            size={40}
            color="#32cd32"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Feather
            // onPress={() => Linking.openURL(`tel:${phoneNumber}`)}
            name="phone-call"
            size={40}
            color="black"
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <AntDesign
            onPress={() => Linking.openURL(`mailto:${user.email}`)}
            name="mail"
            size={40}
            color="black"
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => swipeRef.current.swipeRight()}>
          <Ionicons name="heart-circle-sharp" size={60} color="green" />
        </TouchableOpacity>

        <Modal animatiomnType="slide" visible={showFilter}>
          <FilterScreen
            closeModal={(filterBy) => {
              console.log("heree");
              filterItems(filterBy);
              setShowFilter(false);
            }}
          />
        </Modal>
      </View>

      <StatusBar style="auto" />
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  menuItem: {
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderBottomColor: "black",
    borderWidth: 1,
  },
  cardShadow: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,

    elevation: 2,
  },
});
