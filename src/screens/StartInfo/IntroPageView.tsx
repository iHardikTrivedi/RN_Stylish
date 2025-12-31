import React from "react";
import { View, Text } from "react-native";
import type { IntroPage } from "./data";
import styles from "./styles";

const IntroPageView = ({ page }: { page: IntroPage }) => {
  const Svg = page.image;

  return (
    <View style={styles.page}>
      <Svg width={260} height={260} />
      <Text style={styles.title}>{page.title}</Text>
      <Text style={styles.description}>{page.description}</Text>
    </View>
  );
};

export default IntroPageView;
