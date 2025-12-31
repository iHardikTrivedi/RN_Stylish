import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import StartInfoScreen from "../screens/StartInfo/StartInfoScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { RootStackParamList } from "./types";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, "Splash">;

function BootScreen({ navigation }: Props) {
  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(async () => {
      try {
        const seenIntro = await AsyncStorage.getItem("hasSeenIntro");
        if (!mounted) return;

        navigation.reset({
          index: 0,
          routes: [{ name: seenIntro ? "Auth" : "Intro" }],
        });
      } catch {
        if (!mounted) return;

        navigation.reset({
          index: 0,
          routes: [{ name: "Intro" }],
        });
      }
    }, 1500);

    return () => {
      mounted = false;
      clearTimeout(timer);
    };
  }, [navigation]);

  return <SplashScreen />;
}

export default function RootNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {/* ✅ Boot is Splash + redirect */}
      <Stack.Screen name="Splash" component={BootScreen} />

      {/* ✅ Always registered routes */}
      <Stack.Screen name="Intro" component={StartInfoScreen} />
      <Stack.Screen name="Auth" component={AuthStack} />
      <Stack.Screen name="App" component={AppStack} />
    </Stack.Navigator>
  );
}
