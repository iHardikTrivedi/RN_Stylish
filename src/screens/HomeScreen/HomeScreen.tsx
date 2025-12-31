import React, { useEffect } from "react";
import { View, Image } from "react-native";
import styles from "./style";
import GetStartedBg from "../../../assets/JPGs/get_started_bg.jpg";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function HomeScreen() {
  useEffect(() => {
    AsyncStorage.removeItem("hasSeenIntro");
  }, []);

  return (
    <View style={styles.safe}>
      <Image source={GetStartedBg} style={{ width: "100%", height: "100%" }} />
    </View>
  );
}

