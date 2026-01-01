import React, { useCallback } from "react";
import { ImageBackground, Text, View } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import styles from "./style";

import GetStartedBg from "../../../../assets/JPGs/get_started_bg.jpg";
import PrimaryButton from "../../../components/PrimaryButton/PrimaryButton";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AppStackParamList } from "../../../navigation/types";
import { AppRoutes } from "../../../navigation/routes";

type Props = NativeStackScreenProps<AppStackParamList, AppRoutes.Home>;

export default function HomeScreen({ navigation }: Props) {
  const getStarted = useCallback(() => {
    navigation.navigate(AppRoutes.Tab);
  }, [navigation]);

  return (
    <ImageBackground source={GetStartedBg} style={styles.bg} resizeMode="cover">

      <LinearGradient
        colors={["rgba(0,0,0,0)", "rgba(0,0,0,0.85)"]}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        style={styles.bottomGradient}
      >
        <View style={styles.bottomContent}>
          <Text style={styles.title}>
            You want{"\n"}Authentic, here{"\n"}you go!
          </Text>

          <Text style={styles.subtitle}>Find it here, buy it now!</Text>

          <PrimaryButton title="Get Started" onPress={getStarted} style={styles.button} />
        </View>
      </LinearGradient>
    </ImageBackground>
  );
}
