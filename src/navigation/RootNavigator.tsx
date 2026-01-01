import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { NativeStackScreenProps } from "@react-navigation/native-stack";

import SplashScreen from "../screens/Splash/SplashScreen";
import StartInfoScreen from "../screens/StartInfo/StartInfoScreen";
import AuthStack from "./AuthStack";
import AppStack from "./AppStack";
import { RootStackParamList } from "./types";
import { RootRoutes } from "./routes";

const Stack = createNativeStackNavigator<RootStackParamList>();

type Props = NativeStackScreenProps<RootStackParamList, RootRoutes.Splash>;

function BootScreen({ navigation }: Props) {
  useEffect(() => {
    let mounted = true;

    const timer = setTimeout(async () => {
      try {
        const seenIntro = await AsyncStorage.getItem("hasSeenIntro");
        if (!mounted) return;

        navigation.reset({
          index: 0,
          routes: [{ name: seenIntro ? RootRoutes.Auth : RootRoutes.Intro }],
        });
      } catch {
        if (!mounted) return;

        navigation.reset({
          index: 0,
          routes: [{ name: RootRoutes.Intro }],
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
      <Stack.Screen name={RootRoutes.Splash} component={BootScreen} />

      {/* ✅ Always registered routes */}
      <Stack.Screen name={RootRoutes.Intro} component={StartInfoScreen} />
      <Stack.Screen name={RootRoutes.Auth} component={AuthStack} />
      <Stack.Screen name={RootRoutes.App} component={AppStack} />
    </Stack.Navigator>
  );
}
