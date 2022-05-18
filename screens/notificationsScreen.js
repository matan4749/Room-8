import React, { useLayoutEffect, useRef, useState, useEffect } from "react";
import { StyleSheet, Image, View, Text } from "react-native";
import useAuth from "../hooks/useAuth";
import { notificationService } from "../services/notificationService";
import tw from "tailwind-rn";

const NotificationsScreen = ({ route }) => {
  const { user } = useAuth();
  const [nots, setNots] = useState([]);
  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const nots = await notificationService.getAllById(user.email);
    setNots(nots);
  };

  return (
    <View>
      <Text style={tw("text-center text-xl text-gray-500 p-2 font-bold")}>
        שלום {user.name} ❤️
        <Image
          style={tw("h-10 w-10 rounded-full")}
          source={{ uri: user.photoURL }}
        />
      </Text>
      {nots.map((not) => {
        return (
          <View key={not.id}>
            <Text>{not.title}</Text>
            <Text>{not.desc}</Text>
          </View>
        );
      })}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({});
