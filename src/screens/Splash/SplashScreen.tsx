import React from "react";
import { View } from "react-native";
import styles from "./styles";
import Logo from "../../../assets/SVGs/logo_app.svg";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      <Logo width={275} height={100} />
    </View>
  );
};

export default SplashScreen;
